import React from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup } = useSelector((state) => state.popup);

  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  return(
    <>
    <aside className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`} style={{position: "fixed"}}>
      <div className="px-6 py-4 my-8">
        <img src={logo_with_title} alt="logo" />
      </div>
      <nav className="flex-1 px-6 space-y-2">
        <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Dashboard")}>
        <img src={dashboardIcon} alt="icon" />
        <span>Dashboard</span>
        </button>
        <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Dashboard")}>
        <img src={bookIcon} alt="icon" />
        <span>Books</span>
        </button>

        {
          isAuthenticated && user.role === "Admin" && (
            <></>
          )
        }
      </nav>

    </aside>
    </>)
};

export default SideBar;
