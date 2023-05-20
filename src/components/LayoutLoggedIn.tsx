import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useState } from "react";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import appSlice, { login, logout } from "../features/app/appSlice";
import { getAuth, signOut } from "firebase/auth";
import { AiFillProfile, AiOutlineProfile, AiOutlineUser } from "react-icons/ai";
export function LayoutLoggedIn() {
  const user = useAppSelector((state) => state.app.user);
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div className=" w-full ">
      <div className="h-[10vh] flex flex-col">
        <p className="bg-black text-white text-sm py-1 text-center">
          ADEBOYE JACOB E-LOG BOOK | Final Project | BAZE UNIVERSITY
        </p>
        <header className="flex flex-1 justify-center md:justify-between items-center px-10 lg:px-60">
          <Link className="flex-1" to="/">
            <img src={logo} alt="logo" />
          </Link>
          {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
          <div className="flex-1 flex flex-row justify-center">
            <p className="w-fit bg-white shadow-lg py-2 px-5 rounded-3xl">
              Weekly Progress Chart
            </p>
          </div>
          <nav className="hidden flex-1 md:block">
            <ul className=" flex gap-5 items-center justify-end ">
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
                      Dashboard
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
                square
                className=" text-xs"
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
              <div className=" flex flex-col aspect-square justify-center items-center">
                <AiOutlineUser />
                {user && user.displayName?.split(" ")[0]}
              </div>
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
