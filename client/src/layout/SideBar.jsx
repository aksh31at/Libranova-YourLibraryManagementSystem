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
import { logout, resetAuthSlice, getUser } from "../store/slices/authSlice"; // getUser included here
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddNewAdmin from "../popups/AddNewAdmin";

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
    dispatch(getUser()); // Fetch user on sidebar mount
  }, [dispatch]);

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

  return (
    <>
      <aside className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`} style={{ position: "fixed" }}>
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>
        <nav className="flex-1 px-6 space-y-2">
          <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Dashboard")}>
            <img src={dashboardIcon} alt="icon" />
            <span>Dashboard</span>
          </button>
          <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Books")}>
            <img src={bookIcon} alt="icon" />
            <span>Books</span>
          </button>

          {
            isAuthenticated && user?.role === "Admin" && (
              <>
                <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Catalog")}>
                  <img src={catalogIcon} alt="icon" />
                  <span>Catalog</span>
                </button>

                <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("Users")}>
                  <img src={usersIcon} alt="icon" />
                  <span>Users</span>
                </button>

                <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => dispatch(toggleAddNewAdminPopup())}>
                  <RiAdminFill className="text-2xl w-6 h-6" />
                  <span>Add New Admin</span>
                </button>
              </>
            )}
          {isAuthenticated && user?.role === "User" && (
            <>
              <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => setSelectedComponent("My Borrowed Books")}>
                <img src={catalogIcon} alt="icon" />
                <span>My Borrowed Books</span>
              </button>
            </>
          )}
          <button className="w-full  py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" >
            <img src={settingIcon} alt="icon" />
            <span>Updated Credentials</span>
          </button>
        </nav>
        <div className="px-6 py-4 flex justify-between items-center">
          <button className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointe flex items-center justify-center space-x-5 mx-auto w-fit" >
            <img src={logoutIcon} alt="icon" />
            <span>Log Out</span>
          </button>
        </div>
        <img src={closeIcon} alt="icon" onClick={() => setIsSideBarOpen(!isSideBarOpen)} className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden" />
      </aside>
      {addNewAdminPopup && <AddNewAdmin />}
    </>
  );
};

export default SideBar;
