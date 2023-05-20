import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useState } from "react";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import appSlice, { login, logout } from "../features/app/appSlice";
import { getAuth, signOut } from "firebase/auth";
export function LayoutLoggedIn() {
  const user = useAppSelector((state) => state.app.user);
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div className=" w-full ">
      <div className="h-[10vh]">
        <p className="bg-black text-white text-sm py-1 text-center">
          ADEBOYE JACOB E-LOG BOOK | Final Project | BAZE UNIVERSITY
        </p>
        <header className="flex justify-center md:justify-between items-center px-10 lg:px-60">
          <img src={logo} />
          {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
          <p className="font-bold text-xl text-[#FF4A1C]">
            Welcome {user?.user && user.user.displayName?.split(" ")[0]}
          </p>
          <nav className="hidden md:block">
            <ul className=" flex gap-5 items-center my-10">
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
                  to="/about"
                >
                  <div className="flex flex-row items-center gap-1">
                    {activeLink === "about" && (
                      <div className="w-2 h-2 bg-[#FF4A1C] rounded-2xl"></div>
                    )}
                    <p className={activeLink === "about" ? "font-bold" : ""}>
                      About
                    </p>
                  </div>
                </NavLink>
              </li>

              <Button
                handleClick={() => {
                  dispatch(logout());
                  signOut(auth).then(() => {
                    navigate("/");
                  });
                  console.log(user);
                }}
                value="Log Out"
                secondary
              ></Button>
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
