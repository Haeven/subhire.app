import {
  BiUser,
  BiLogOut,
  BiMessageSquareDetail,
  BiMoon,
  BiSun,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

import { AppTooltip, AppButton, ProfilePicture } from "@/components";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getThemeState, toggleDarkmode } from "./themeSlice";
import { logout } from "../authentication";
import { getUserState } from "../authentication/userSlice";
import { resetChat } from "../inbox/chatReducer";
import {
  changeSideContent,
  getSideContent,
  showUserProfile,
} from "@/lib/redux/reducers/sideContentReducer";

const SIDEBAR_PAGE_BUTTONS = [
  { name: "Chats", icon: BiMessageSquareDetail, content: "chats" },
  { name: "Add Contact", icon: BiUser, content: "addcontact" },//TODO: Make Add Contact page show list of contacts before search input
  { name: "Settings", icon: FiSettings, content: "Settings" },
];

interface SidebarProps {}

const Sidebar = () => {
  const { darkmode } = useAppSelector(getThemeState);
  const { user: currentUser } = useAppSelector(getUserState);
  const { content: sidebarContent } = useAppSelector(getSideContent);

  const dispatch = useAppDispatch();

  const sidebarBtnHandler = (content: any) => {
    content = content.replace(" ", "");

    if (content === "Settings") {
      dispatch(showUserProfile({ userProfileData: currentUser }));
      return;
    }

    dispatch(changeSideContent({ content }));
  };

  const darkmodeClickHandler = () => dispatch(() => ({type:'toggleDarkmode', payload: false}));

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(resetChat());
  };

  return (
    <>
      <nav className="relative hidden p-3 py-4 w-fit bg-secondary md:flex md:flex-col gap-4 pt-10">
        <button
          onClick={() => sidebarBtnHandler("Settings")}
          className="text relative group flex justify-center gap-2 items-center px-4 border-b border-main pb-4"
        >
          <ProfilePicture
            isOnline={false}
            photoURL={currentUser?.photoURL}
            size="small"
          />
          < AppTooltip tip="Profile" position="right" />
        </button>
        <div className="flex flex-col gap-1 items-center">
          {SIDEBAR_PAGE_BUTTONS.map((obj) => {
            const Icon = obj.icon;
            return (
              < AppButton
                variant="transparent"
                className={`${
                  sidebarContent === obj.content &&
                  "bg-muted-light/5 dark:bg-muted-dark/5"
                }  relative group z-10 py-3 px-3`}
                key={obj.content}
                onClick={() => sidebarBtnHandler(obj.content)}
              >
                <Icon className={` text-muted text-2xl`} />
                < AppTooltip tip={obj.name} position="right" />
                {sidebarContent === obj.content && (
                  <div className="p-0.5 h-10 w-1 -left-3 top-1/2 -translate-y-1/2 absolute bg-primary-main rounded-full" />
                )}
              </ AppButton>
            );
          })}
        </div>

        <div className="absolute bottom-4 flex flex-col gap-1">
          < AppButton
            variant="transparent"
            className="relative group z-10 py-3 px-3"
            onClick={darkmodeClickHandler}
          >
            {darkmode ? (
              <BiSun className="text-muted text-2xl" />
            ) : (
              <BiMoon className="text-muted text-2xl" />
            )}
            < AppTooltip
              tip={darkmode ? "lightmode" : "darkmode"}
              position="right"
            ></ AppTooltip>
          </ AppButton>

          < AppButton
            variant="transparent"
            className="relative group z-10 py-3 px-3"
            onClick={handleSignOut}
          >
            <BiLogOut className="text-muted text-2xl" />
            < AppTooltip tip="logout" position="right" />
          </ AppButton>
        </div>
      </nav>

      <nav className="mt-auto p-2 w-full bg-muted-light/5 dark:bg-muted-dark/5 md:hidden  gap-4 justify-center">
        <div className="flex gap-2 justify-center">
          {SIDEBAR_PAGE_BUTTONS.map((obj) => {
            const Icon = obj.icon;
            return (
              < AppButton
                variant="transparent"
                className={`${
                  sidebarContent === obj.content &&
                  "bg-muted-light/5 dark:bg-muted-dark/5"
                }   relative group z-10 py-3 px-3`}
                key={obj.content}
                onClick={() => sidebarBtnHandler(obj.content)}
              >
                <Icon className={` text-muted text-2xl`} />
                < AppTooltip tip={obj.name} position="top" />
                {sidebarContent === obj.content && (
                  <div className="p-0.5 h-1 w-10 left-1/2 -bottom-2 -translate-x-1/2 absolute bg-primary-main rounded-full" />
                )}
              </ AppButton>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
