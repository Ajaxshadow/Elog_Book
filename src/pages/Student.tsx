import React, { useEffect, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import StudentSheet, { WeekReport } from "../components/StudentSheet";
import { GET_DOCUMENT } from "../hooks/firestoreHooks";
import { useAppSelector } from "../app/hooks";
import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Console } from "console";
import { InfinitySpin } from "react-loader-spinner";

const dates: string[] = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
  "Week 7",
];

export default function Student() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [move, setMove] = useState(0);
  const user = useAppSelector((state) => state.app.user);
  const [documentData, setDocumentData] = useState<DocumentData>();
  const [weekData, setWeekData] = useState({});
  const getDoc = async () => {
    if (user) {
      const doc = await GET_DOCUMENT("students", user.user.uid);
      if (doc?.exists()) {
        console.log("Document data:", doc.data());
        setDocumentData(doc.data());
        setWeekData(doc.data().WEEKLY_PROGRESS);
        console.log(weekData);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  // Set loading state to true initially
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDoc();
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
    <div className="h-[90vh] gap-5 pt-14 flex justify-center items-center">
      <div
        className=" cursor-pointer z-50 group"
        onClick={() => {
          if (currentSlide <= 0) {
            setCurrentSlide(dates.length - 1);
          } else {
            setCurrentSlide(currentSlide - 1);
          }
          setMove(-1);
        }}
      >
        <AiFillLeftCircle
          size={70}
          className="text-black/30 group-hover:text-[#FF4A1C] transition-colors"
        />
        <p className="w-full text-sm font-bold group-hover:text-[#FF4A1C] transition-colors">
          Prev Week
        </p>
      </div>
      <div className=" w-2/6 h-full  box-border relative">
        {dates.map((date, index) => {
          return (
            <StudentSheet
              weekData={weekData}
              dates={dates}
              date={date}
              key={index}
              weekID={index}
              currentIndex={currentSlide}
              move={move}
              style={{}}
            />
          );
        })}
      </div>
      <div
        className=" cursor-pointer  z-50 group"
        onClick={() => {
          if (currentSlide >= dates.length - 1) {
            setCurrentSlide(0);
          } else {
            setCurrentSlide(currentSlide + 1);
          }

          setMove(1);
        }}
      >
        <AiFillRightCircle
          size={70}
          className="text-black/30 group-hover:text-[#FF4A1C] transition-colors"
        />
        <p className="w-full text-sm font-bold group-hover:text-[#FF4A1C] transition-colors">
          Next Week
        </p>
      </div>
    </div>
  );
}
