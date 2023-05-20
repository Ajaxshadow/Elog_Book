import React, { ChangeEvent, useEffect, useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGoogleCircle,
} from "react-icons/ai";
import Button from "../components/Button";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";

import { login, setFirstTime } from "../features/app/appSlice";
import { InfinitySpin } from "react-loader-spinner";
import { LOGIN_EMAIL } from "../hooks/firestoreHooks";
export interface LoginHandlerProps {
  email: string;
  password: string;
}

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginData, setLoginData] = useState<LoginHandlerProps>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };
  const updateLoginData = (target: string, text: string) => {
    setLoginError(false);
    switch (target) {
      case "email":
        setLoginData((prev) => ({ ...prev, email: text }));
        break;
      case "password":
        setLoginData((prev) => ({ ...prev, password: text }));
        break;
      default:
        break;
    }
  };
  const signInWithEmail = async () => {
    setAuthing(true);
    // setPersistence(auth, browserSessionPersistence)
    //   .then(() => {
    //     signInWithEmailAndPassword(auth, loginData.email, loginData.password)
    //       .then((user) => {
    //         dispatch(login(user));
    //         navigate("/");
    //       })
    //       .catch((error: any) => {
    //         setLoginError(true);
    //         setAuthing(false);
    //         console.log(error.type);
    //       });
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
    const user = await LOGIN_EMAIL(loginData).catch((error) => {
      setLoginError(true);
      setAuthing(false);
      console.log(error);
    });
    if (user) {
      const newUser = getAdditionalUserInfo(user)?.isNewUser;
      dispatch(setFirstTime(newUser));
      dispatch(login(user.user));
      navigate("/");
    }
  };
  const [hidePassword, setHidePassword] = useState(true);

  // Set loading state to true initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise((r) => setTimeout(r, 2000));

      // Toggle loading state
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-[90vh] grid place-items-center">
        <InfinitySpin color="#FF4A1C" />
      </div>
    );
  }

  return (
    <div className=" pt-20 w-screen h-[90vh] flex ">
      <div className="bg-[#283044] w-1/2 h-full ">Hello</div>
      <div className=" w-1/2 h-full flex flex-col gap-5 items-center justify-center">
        <div className="bg-[#283044] overflow-hidden  z-10 relative w-fit self-center flex flex-col  gap-5 rounded-md">
          <h1 className=" text-white font-bold text-3xl m-5">Login</h1>
          <div className="p-20 pt-0 flex flex-col gap-2 items-center">
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateLoginData("email", event.target.value)
              }
              className="bg-black/20 rounded-md py-2 px-5 w-full text-white"
              type="email" //toyin3516@bazeuniversity.edu.ng
              placeholder="Email"
            ></input>
            <div className=" flex flex-row gap-2">
              <input
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateLoginData("password", event.target.value)
                }
                className="bg-black/20 rounded-l-md py-2 px-5 text-white max-h-fit"
                type={hidePassword ? "password" : "text"}
                placeholder="Password"
              ></input>
              <div
                onClick={() => {
                  setHidePassword(!hidePassword);
                }}
                className="togglePass group overflow-hidden relative cursor-pointer text-sm h-full self-center px-2  rounded-r-md  bg-black/20 grid place-items-center text-white"
              >
                <div className=" absolute w-full h-full bg-white top-full left-0 group-hover:top-0 transition-all"></div>
                {hidePassword ? (
                  <AiFillEye
                    className=" z-10 text-white group-hover:text-[#FF4A1C] transition-colors"
                    size={20}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="z-10 text-white group-hover:text-[#FF4A1C] transition-colors"
                    size={20}
                  />
                )}
              </div>
            </div>
            <div className="mt-3">
              <Button
                loading={authing}
                handleClick={signInWithEmail}
                value="Log In"
                secondary
                slimmer
              ></Button>
            </div>
            <AiFillGoogleCircle
              size={30}
              className=" cursor-pointer"
              color="white"
              onClick={signInWithGoogle}
            ></AiFillGoogleCircle>
          </div>
          <div
            className={`${
              loginError ? "bottom-0" : "-bottom-full"
            } absolute error bg-[#FF4A1C] w-full text-center text-white py-2 transition-all duration-1000`}
          >
            Username or Password Incorrect
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p>Don't have an Account? </p>
          <Button linkTO="/register" value="Register"></Button>
        </div>
      </div>
    </div>
  );
}
