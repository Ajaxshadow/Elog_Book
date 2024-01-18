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
import { UserCredential, getAuth, signOut } from "firebase/auth";
import { setRole, setUser } from "./features/app/appSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";

import Button from "./components/Button";
import { CalendarTheme } from "./theme/CalendarTheme";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalBG from "./assets/GlobalBG.svg";
import Landing from "./pages/Landing";
import LayoutHeader from "./components/LayoutHeader";
import { LayoutLoggedIn } from "./components/LayoutLoggedIn";
import { LayoutNoUser } from "./components/LayoutNoUser";
import Login from "./pages/Login";
import React from "react";
import Register from "./pages/Register";
import Student from "./pages/Student";
import SuperLogin from "./pages/SuperLogin";
import Supervisor from "./pages/Supervisor";
import { config } from "./firebaseConfig/config";
import { initializeApp } from "firebase/app";
import logo from "./assets/Logo.svg";

export function App() {
  const [loggedIn, setLoggedIn] = useState({} as any);

  const user = useAppSelector((state) => state.app.user);
  const role = useAppSelector((state) => state.app.role);
  const [localRole, setLocalRole] = React.useState<string | null>(null)
  const auth = getAuth();
  const dispatch = useAppDispatch();



  useEffect(() => {
    if (localStorage.getItem("@UserRole") && localRole === null) {
      setLocalRole(localStorage.getItem("@UserRole"))
    }
    const unsubscribe = auth.onIdTokenChanged((user) => {
      dispatch(setUser(user));
      console.log({ localRole })
      if (localRole === "student" || localRole === "supervisor") { dispatch(setRole({ role: localRole })) }
    });

    return unsubscribe;
  }, [dispatch, localRole]);

  return (
    <BrowserRouter>
      <ChakraProvider theme={CalendarTheme}>
        {/* <div className="w-screen h-screen absolute bg-zinc-800 md:hidden z-[99]">
        <p className=" bg-black text-white text-sm py-1 text-center">
          ADEBOYE JACOB E-LOG BOOK | Final Project | BAZE UNIVERSITY
        </p>

        <div className=" flex justify-center flex-col font-bold text-2xl text-white text-center mt-48 ">
          <img src={logo} alt="Logo" />
          Open site on Desktop
        </div>
      </div> */}
        <div className=" font-sans bg-[#ECEDF1]">
          <div
            style={{
              backgroundImage: `url(${GlobalBG})`,
              backgroundPosition: "bottom",
              backgroundSize: "30em",
            }}
            className={`w-full h-full absolute ${user ? " opacity-5" : "opacity-10"
              } pointer-events-none`}
          ></div>
          <Routes>
            <Route path="/" element={<LayoutHeader />}>
              <Route index element={user !== null ?
                role?.role === "student" ? <Student />
                  : role?.role === "supervisor" ? <Supervisor /> : <Landing />
                : <Landing />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="superLogin" element={<SuperLogin />} />
              <Route path="register" element={<Register />} />
              <Route path="student" element={<Student />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </div>
      </ChakraProvider>
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
