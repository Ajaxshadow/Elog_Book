import {
  Route,
  Routes,
  Link,
  Outlet,
  BrowserRouter,
  NavLink,
} from "react-router-dom";
import logo from "./assets/Logo.svg";
import { useState } from "react";
import Landing from "./pages/Landing";
import React from "react";
import Button from "./components/Button";
import GlobalBG from "./assets/GlobalBG.svg";
import Login from "./pages/Login";
import { initializeApp } from "firebase/app";
import { config } from "./firebaseConfig/config";
import { getAuth, signOut } from "firebase/auth";
import Student from "./pages/Student";
import Register from "./pages/Register";
import { useAppSelector } from "./app/hooks";

initializeApp(config.firebaseConfig);

export function App() {
  const [loggedIn, setLoggedIn] = useState({} as any);

  const user = useAppSelector((state) => state.app.user);

  return (
    <BrowserRouter>
      <div className="w-screen h-screen absolute bg-rose-100 md:hidden z-50">
        <p className=" bg-black text-white text-sm py-1 text-center">
          ADEBOYE JACOB E-LOG BOOK | Final Project | BAZE UNIVERSITY
        </p>

        <div className=" flex justify-center flex-col font-bold text-2xl text-black text-center mt-48 ">
          <img src={logo} />
          Open site on Desktop
        </div>
      </div>
      <div className=" font-sans bg-[#ECEDF1]">
        <div
          style={{
            backgroundImage: `url(${GlobalBG})`,
            backgroundPosition: "bottom",
            backgroundSize: "30em",
          }}
          className="w-full h-full absolute opacity-10 pointer-events-none"
        ></div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="student" element={<Student />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Layout() {
  const [activeLink, setActiveLink] = useState("");
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

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
