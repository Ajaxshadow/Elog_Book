import {
  UserCredential,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  DocumentData,
  WithFieldValue,
  collection,
  doc,
  getFirestore,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { WeekReport } from "../components/StudentSheet";
import { initializeApp } from "firebase/app";
import { config } from "../firebaseConfig/config";
import { login } from "../features/app/appSlice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { LoginHandlerProps } from "../pages/Login";

initializeApp(config.firebaseConfig);
const fireStore = getFirestore();
const studentsCollectionRef = collection(fireStore, "students");
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

export const SAVE_WEEK_TO_DB = async (
  dataToSave: WeekReport,
  user: UserCredential
) => {
  try {
    const studentRef = doc(studentsCollectionRef, user.user.uid);
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
