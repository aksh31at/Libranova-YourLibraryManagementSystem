import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");

  const { user, isAuthenticated } = useSelector(state => state.auth);

  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }


  return(
  <>
  <div className="relative md:pl-64 min-h-screen bg-gray-100 flex">
    <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black text-white h-9 w-9 rounded-md">
      <GiHamburgerMenu 
      className="text-2xl" 
      onClick={()=>setIsSideBarOpen(!isSideBarOpen)}
      />
    </div>
    <Sidebar 
    isSideBarOpen={isSideBarOpen} 
    setIsSideBarOpen={setIsSideBarOpen} 
    setSelectedComponent={setSelectedComponent}
    />
    {
      (() => {
        switch (selectedComponent) {
          case "Dashboard":
            return user?.role === "User" ? (
              <UserDashboard />
            ) : (
              <AdminDashboard />
            );
            break;
          case "Books":
            return <BookManagement />;
            break;
          case "Catalog":
            if (user.role === "Admin") {
              return <Catalog />;
            }
            break;
          case "Users":
            if (user.role === "Admin") {
              return <Users/>;
            }
            return null;
          case "My Borrowed Books":
              return <MyBorrowedBooks />;
            return null;
          default:
            return user?.role === "User" ? (
              <UserDashboard />
            ) : (
              <AdminDashboard />
            );
            break;
        }
      })()}
    </div>
    </>
  );
  
};

export default Home;
