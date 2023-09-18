import { NavLink, Outlet } from "react-router-dom";

import Button from "./Button";
import logo from "../assets/Logo.svg";
import { useState } from "react";

export function LayoutNoUser() {
  const [activeLink, setActiveLink] = useState("");
  return (
    <div className=" w-full ">
      <div className="h-[10vh] flex flex-col">
        <p className="bg-black text-white text-sm py-1 text-center">
          ADEOYE JACOB E-LOG BOOK | Final Project | BAZE UNIVERSITY
        </p>
        <header className="flex flex-1 justify-center md:justify-between items-center px-10 lg:px-60">
          <img src={logo} />
          {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
          <nav className="hidden md:block">
            <ul className=" flex gap-5 items-center">
              <li className=" ">
                <NavLink
                  className={({ isActive }) => {
                    isActive ? setActiveLink("home") : setActiveLink("NOThome");
                    return "";
                  }}
                  to="/"
                >
                  <div className="flex flex-row items-center gap-1">
                    {activeLink === "home" && (
                      <div className="w-2 h-2 bg-[#FF4A1C] rounded-2xl"></div>
                    )}
                    <p className={activeLink === "home" ? "font-bold" : ""}>
                      Home
                    </p>
                  </div>
                </NavLink>
              </li>
              <li className=" ">
                <NavLink
                  className={({ isActive }) => {
                    isActive && setActiveLink("about");
                    return "";
                  }}
                  to="/superLogin"
                >
                  <div className="flex flex-row items-center gap-1">
                    {activeLink === "about" && (
                      <div className="w-2 h-2 bg-[#FF4A1C] rounded-2xl"></div>
                    )}
                    <div className="relative">
                      <p className={activeLink === "about" ? "font-bold" : ""}>
                        Supervisor
                      </p>
                      <p className="absolute text-[0.5rem] right-0 -top-2 bg-[#FF4A1C] text-white rounded-md px-2 py-[0.1rem]">Login</p>
                    </div>
                  </div>
                </NavLink>
              </li>

              <Button linkTO="/login" value="Log In"></Button>
            </ul>
          </nav>
        </header>
      </div>
      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
