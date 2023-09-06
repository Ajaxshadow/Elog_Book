import {
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  User,
  UserCredential,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { LoginHandlerProps } from "../pages/Login";
import { WeekReport } from "../components/StudentSheet";
import { config } from "../firebaseConfig/config";
import { initializeApp } from "firebase/app";
import { login } from "../features/app/appSlice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";

initializeApp(config.firebaseConfig);
const fireStore = getFirestore();
const studentsCollectionRef = collection(fireStore, "students");
const superCollectionRef = collection(fireStore, "supervisors");
const auth = getAuth();

export const LOGIN_EMAIL = async (loginData: LoginHandlerProps) => {
  return setPersistence(auth, browserSessionPersistence).then((res) => {
    return signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );
  });
};

export const GET_DOCUMENT = async (collection: string, document: string) => {
  const docRef = doc(fireStore, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const SAVE_WEEK_TO_DB = async (dataToSave: WeekReport, user: User) => {
  try {
    const studentRef = doc(studentsCollectionRef, user.uid);
    const WeekHeader = "Week_" + dataToSave.weekID;
    await setDoc(
      studentRef,
      {
        WEEKLY_PROGRESS: { [WeekHeader]: dataToSave },
      },
      { merge: true }
    ).then(() => {
      console.log("Saved!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

export const NEWLEC = async (lId:string, user: User)=>{
  try {
    const superRef = doc(superCollectionRef, user.uid);
    await setDoc(
      superRef,
      {
        LecturerId: lId,
        name: user.displayName,
      },
      { merge: true }
    ).then(() => {
      // ! console.log("Saved!!! PARTICULARS");
    });
  } catch (err) {
    console.log(err);
  }
}

export const SAVE_PARTICULARS = async (dataToSave: Object, user: User) => {
  try {
    const studentRef = doc(studentsCollectionRef, user.uid);
    await setDoc(
      studentRef,
      {
        PARTICULARS: dataToSave,
      },
      { merge: true }
    ).then(() => {
      console.log("Saved!!! PARTICULARS");
    });
  } catch (err) {
    console.log(err);
  }
};

export function useFireHook(){
  const [sups, setSups] = useState<DocumentData>()
  const [supsLoading, setSupsLoading] = useState(true)
  const getSups = async () => {
    setSupsLoading(true)
    const x = doc(fireStore, "supervisors", "activeSupervisors");
    const y = await getDoc(x)
    if(y.exists()){
      setSupsLoading(false)
      setSups(y.data())
    }
   }
  
   React.useEffect(() =>{
    getSups()
   },[]);
   
  return [sups,supsLoading]
}
