import React, { useState } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo_with_title} alt="Logo" />
        </div>
        <div className="sidebar-items">
          <button onClick={() => setSelectedComponent("Dashboard")}>
            <img src={dashboardIcon} alt="Dashboard" />
            Dashboard
          </button>
          <button onClick={() => setSelectedComponent("Books")}>
            <img src={bookIcon} alt="Books" />
            Book Management
          </button>
          {user?.role === "Admin" && (
            <button onClick={() => setSelectedComponent("Catalog")}>
              <img src={catalogIcon} alt="Catalog" />
              Catalog
            </button>
          )}
          {user?.role === "Admin" && (
            <button onClick={() => setSelectedComponent("Users")}>
              <img src={usersIcon} alt="Users" />
              Users
            </button>
          )}
          <button onClick={() => setSelectedComponent("My Borrowed Books")}>
            <img src={settingIcon} alt="Settings" />
            My Borrowed Books
          </button>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout" />
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h2>{selectedComponent}</h2>
          {user?.role === "Admin" && <RiAdminFill size={24} color="#fff" />}
        </div>

        <div className="content-body">
          {user && (() => {
            switch (selectedComponent) {
              case "Dashboard":
                return user.role === "User" ? <UserDashboard /> : <AdminDashboard />;
              case "Books":
                return <BookManagement />;
              case "Catalog":
                return user.role === "Admin" ? <Catalog /> : null;
              case "Users":
                return user.role === "Admin" ? <Users /> : null;
              case "My Borrowed Books":
                return <MyBorrowedBooks />;
              default:
                return user.role === "User" ? <UserDashboard /> : <AdminDashboard />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Home;
