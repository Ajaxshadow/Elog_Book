import {
  Route,
  Routes,
  Link,
  Outlet,
  BrowserRouter,
  NavLink,
} from "react-router-dom";
import logo from "./assets/Logo.svg";
import BGCircles from "./assets/BGCircles.svg";
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen absolute bg-black md:hidden">
        <p className="bg-black text-white text-sm py-1 text-center">
          ADEBOYE JACOB E-LOG BOOK | Final Project
        </p>
        <div className=" font-bold text-2xl text-white text-center mt-48 ">
          Open site on Desktop
        </div>
      </div>
      <div className=" font-sans bg-[#ECEDF1]">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
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
        <p className="bg-black text-white text-sm py-1 pl-5">
          ADEBOYE JACOB E-LOG BOOK | Final Project
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
                    isActive && setActiveLink("home");
                  }}
                  to="/"
                >
                  <div className="flex flex-row items-center gap-1">
                    {activeLink === "home" && (
                      <div className="w-2 h-2 bg-[#FF4A1C] rounded-2xl"></div>
                    )}
                    <p className={activeLink === "home" && "font-bold"}>Home</p>
                  </div>
                </NavLink>
              </li>
              <li className=" ">
                <NavLink
                  className={({ isActive }) =>
                    isActive && setActiveLink("about")
                  }
                  to="/about"
                >
                  <div className="flex flex-row items-center gap-1">
                    {activeLink === "about" && (
                      <div className="w-2 h-2 bg-[#FF4A1C] rounded-2xl"></div>
                    )}
                    <p className={activeLink === "about" && "font-bold"}>
                      About
                    </p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" bg-[#246C5A] rounded-md text-white py-3 px-4"
                  to="/dashboard"
                >
                  Log In
                </NavLink>
              </li>
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

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${BGCircles})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
      }}
      className="px-10 lg:px-60 h-[90vh] flex  flex-col justify-center"
    >
      <div>
        <p className="text-[#6C6C6C] uppercase font-semibold md:text-lg pl-10">
          Easily track <span className="text-[#FF4A1C]">Student...</span>
        </p>
        <div className=" capitalize font-bold md:text-5xl text-center md:text-left">
          <span className="text-[#FF4A1C]"> progress & attendance </span>
          <br />
          Stay organized, set goals, <br />
          and access feedback
        </div>
        <div className="flex gap-3 mt-10">
          <button className="bg-[#246C5A] rounded-md text-white py-2 px-4">
            Log In
          </button>
          <button className="bg-[#FF4A1C] rounded-md text-white py-2 px-4">
            About
          </button>
        </div>
      </div>
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

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
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
