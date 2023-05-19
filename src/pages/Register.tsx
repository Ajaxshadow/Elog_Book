import React, { ChangeEvent, useState } from "react";
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
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  updateProfile,
} from "firebase/auth";
import db from "firebase/database";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/app/appSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
interface RegisterHandlerProps {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export default function Register() {
  const dispatch = useAppDispatch();
  const fireStore = getFirestore();
  const collectionRef = collection(fireStore, "students");
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserCredential>(
    {} as UserCredential
  );
  const [authing, setAuthing] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterHandlerProps>({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const addStudentId = async (data: UserCredential) => {
    dispatch(login(data));
    setUserData(data);
    try {
      const studentRef = doc(collectionRef, data.user.uid);
      await setDoc(studentRef, {}).then(() => {
        sessionStorage.setItem("USERDATA", data.user.uid);
        navigate("/student");
      });
    } catch (err) {
      console.log(err);
    }
  };

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
    setRegisterError(false);
    switch (target) {
      case "email":
        setRegisterData((prev) => ({ ...prev, email: text }));
        break;
      case "password":
        setRegisterData((prev) => ({ ...prev, password: text }));
        break;
      case "lname":
        setRegisterData((prev) => ({ ...prev, lname: text }));
        break;
      case "fname":
        setRegisterData((prev) => ({ ...prev, fname: text }));
        break;
      default:
        break;
    }
    console.log(JSON.stringify(registerData));
  };

  const createUser = async () => {
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    )
      .then((user: UserCredential) => {
        console.log(user);
        updateProfile(user.user, {
          displayName: registerData.fname + " " + registerData.lname,
        });
        addStudentId(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <div className=" pt-20 w-screen h-[90vh] flex ">
      <div className="bg-[#283044] w-1/2 h-full ">Hello</div>
      <div className=" w-1/2 h-full flex flex-col gap-5 items-center justify-center">
        <div className="bg-[#283044] overflow-hidden  z-10 relative w-fit self-center flex flex-col  gap-5 rounded-md">
          <h1 className=" text-white font-bold text-3xl m-5">Register</h1>
          <div className="p-20 pt-0 flex flex-col gap-2 items-center">
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateLoginData("fname", event.target.value)
              }
              className="bg-black/20 rounded-md py-2 px-5 w-full text-white"
              type="text" //toyin3516@bazeuniversity.edu.ng
              placeholder="First Name"
            ></input>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateLoginData("lname", event.target.value)
              }
              className="bg-black/20 rounded-md py-2 px-5 w-full text-white"
              type="text" //toyin3516@bazeuniversity.edu.ng
              placeholder="Last Name"
            ></input>
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
                handleClick={createUser}
                value="Register"
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
              registerError ? "bottom-0" : "-bottom-full"
            } absolute error bg-[#FF4A1C] w-full text-center text-white py-2 transition-all duration-1000`}
          >
            Username or Password Incorrect
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p>Already have an account? </p>
          <Button linkTO="/login" value="Login"></Button>
        </div>
      </div>
    </div>
  );
}
