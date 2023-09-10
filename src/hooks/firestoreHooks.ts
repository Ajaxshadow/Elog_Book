import {
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
  setDoc,
  updateDoc
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

export const NEWLEC = async (lId:string,name:string,user: User)=>{
  try {
    const superRef = doc(superCollectionRef, user.uid);
    const aL = doc(superCollectionRef, "activeSupervisors")
    await setDoc(
      superRef,
      {userInfo:{
        LecturerId: lId,
        name,
      }},
      { merge: true }
    ).then(async() => {
      console.log(user)
      await setDoc(
        aL,
        { [user.uid]: {name:name,lId:lId} },
        {merge:true}
      )

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
  const [supees, setSupees] = useState<DocumentData>()
  const [supeesProg, setSupeesProg] = useState<any[]>([])
  const [dtLs, setDtLs] = useState<any[]>([])
  const [supeesFull, setSupeesFull] = useState<DocumentData>()
  const [supsLoading, setSupsLoading] = useState<boolean>(true)
  
  const setSupee = async (supeeID:string, supeeName:string, lId:string,first:boolean)=>{
    const x = doc(fireStore, "supervisors", lId);
    await updateDoc( x, {STUDENTS:arrayUnion({name:supeeName,SiD:supeeID})})
  }
  
  const getSups = async () => {
    setSupsLoading(true)
    const x = doc(fireStore, "supervisors", "activeSupervisors");
    const y = await getDoc(x)
    if(y.exists()){
      setSupsLoading(false)
      setSups(y.data())
    }
   }
  const getSupees = async (uid:string) =>{
    const x = doc(fireStore, "supervisors", uid);
    const y = await getDoc(x)
    if(y.exists()){
      setSupeesFull(y.data())
      setSupees(y.data().STUDENTS)
      return(y.data().STUDENTS)
    }else{return undefined}
  }
  function addDays(date:Date, days:number) {
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
  }
  const getDaysLeft = async (sps:any[]) =>{
    let c:any[] = []
    sps.forEach(async (sp:any,i )=> {
      let entries = 0;
      const x = doc(fireStore, "students", sp.SiD);
      const y = await getDoc(x)
      if(y.exists()){
        if(y.data().PARTICULARS.startDate){
          // console.log(y.data().PARTICULARS.startDate)
          const x:Date = y.data().PARTICULARS.startDate
          const now = new Date()
          const old = new Date(x)
          const d = new Date(x)
          const newD = addDays(d,84)
          const secsdif = (newD.getTime() - now.getTime())
          console.log(secsdif)
          const dif = secsdif/ (1000 * 60 * 60 * 24);
          c.push({[sp.SiD]:Math.round(dif)})
        }
      }else{return([{}])} 
      if(i===sps.length-1){
        // console.log(c)
        setDtLs(c)
        return(c)
      }
    })
    return(dtLs)
    
  }
  const getProg = async (sps:any[]):Promise<any[]|any>=> {
    let c:any[] = []
    sps.forEach(async (sp:any,i )=> {
      let entries = 0;
      const x = doc(fireStore, "students", sp.SiD);
      const y = await getDoc(x)
      if(y.exists()){
        if(y.data().WEEKLY_PROGRESS){
          Object.values(y.data().WEEKLY_PROGRESS).forEach((w:any)=>{
              Object.values(w).forEach(d=>{if(d !== ""){entries++}})
          })
        }
        let x = {[sp.SiD]:Math.round((entries/60) * 100)}
        c.push(x)
      }else{return([{}])} 
      if(i===sps.length-1){
        setSupeesProg(c)
        return(c)
      }
    })
    return(supeesProg)
    
  }
   React.useEffect(() =>{
    getSups()
    
   },[]);
   
  return {sups,setSupee, getProg, supeesFull, getSupees, supees, getDaysLeft}
}
