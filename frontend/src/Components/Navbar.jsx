import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import menu_icon from "../assets/menu_icon.svg";
import cross_icon from "../assets/cross_icon.svg";
const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center justify-between text-lg text-quarter py-4 mb-5 border-b border-sky-600">
      <NavLink
        to="/"
        className="text-2xl font-bold tracking-wide flex items-center space-x-2"
      >
        <img
          onClick={() => navigate("/")}
          className="w-10 h-10 cursor-pointer"
          src={logo}
          alt=""
        />{" "}
        <span className="text-quarter">RespiraScan</span>
      </NavLink>
      <ul className="hidden md:flex items-start gap-5 font-semibold">
        <NavLink
          to="/"
          className="hover:bg-quarter hover:text-gray-50 px-4 py-2 rounded-md transition duration-300"
        >
          <li className="py-1">Home</li>{" "}
        </NavLink>
        <NavLink
          to="/about"
          className="hover:bg-quarter hover:text-gray-50 px-4 py-2 rounded-md transition duration-300"
        >
          <li className="py-1">About</li>{" "}
          <hr className="border-none outline-none h-0.5 bg-quarter w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
              <div className="min-w-48 bg-tertiary rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        }
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={menu_icon}
          alt=""
        />

        {/* mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <div className="text-2xl font-bold tracking-wide flex items-center space-x-2">
              <img className="w-10 h-10" src={logo} alt="" />{" "}
              <span className="text-quarter">Respira Scan</span>
            </div>
            <img
              className="w-12"
              onClick={() => setShowMenu(false)}
              src={cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg text-quarter font-semibold">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block hover:bg-quarter hover:text-white text-center">
                Home
              </p>
            </NavLink>

            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block hover:bg-quarter hover:text-white text-center">
                About
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
