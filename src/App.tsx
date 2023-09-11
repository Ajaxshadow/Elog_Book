import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from "./components/Button";
import GlobalBG from "./assets/GlobalBG.svg";
import Landing from "./pages/Landing";
import LayoutHeader from "./components/LayoutHeader";
import { LayoutLoggedIn } from "./components/LayoutLoggedIn";
import { LayoutNoUser } from "./components/LayoutNoUser";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Login from "./pages/Login";
import React from "react";
import Register from "./pages/Register";
import Student from "./pages/Student";
import Supervisor from "./pages/Supervisor";
import { config } from "./firebaseConfig/config";
import { initializeApp } from "firebase/app";
import logo from "./assets/Logo.svg";
import { setUser } from "./features/app/appSlice";

export function App() {
  const [loggedIn, setLoggedIn] = useState({} as any);

  const user = useAppSelector((state) => state.app.user);
  const role = useAppSelector((state) => state.app.role);
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-screen h-screen absolute bg-zinc-800 md:hidden z-[99]">
        <p className=" bg-black text-white text-sm py-1 text-center">
          ADEBOYE JACOB E-LOG BOOK | Final Project | BAZE UNIVERSITY
        </p>

        <div className=" flex justify-center flex-col font-bold text-2xl text-white text-center mt-48 ">
          <img src={logo} alt="Logo" />
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
          className={`w-full h-full absolute ${
            user ? " opacity-5" : "opacity-10"
          } pointer-events-none`}
        ></div>
        <Routes>
          <Route path="/" element={<LayoutHeader />}>
            <Route index element={user !== null ? 
              role?.role === "student"?<Student /> :<Supervisor/>
              : <Landing />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="student" element={<Student />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
      </LocalizationProvider>
    </BrowserRouter>
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
