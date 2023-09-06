import {
  AiFillLeftCircle,
  AiFillLeftSquare,
  AiFillRightCircle,
  AiFillRightSquare,
} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import StudentSheet, { WeekReport } from "../components/StudentSheet";

import { GET_DOCUMENT } from "../hooks/firestoreHooks";
import { InfinitySpin } from "react-loader-spinner";
import Particulars from "../components/Particulars";
import { ParticularsInterface } from "../interface/particulars";
import WeekSheetMotion from "../components/WeekSheetMotion";
import { setParticulars } from "../features/particulars/particularsSlice";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";

const dates: string[] = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
  "Week 7",
  "Week 8",
  "Week 9",
  "Week 10",
  "Week 11",
  "Week 12",
];

export default function Student() {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [move, setMove] = useState(0);
  const [shouldRenderParticulars, setShouldRenderParticulars] = useState(false);
  const user = useAppSelector((state) => state.app.user);
  const particulars = useAppSelector((state) => state.particulars.particulars);
  const firstTime = useAppSelector((state) => state.app.firstTime);
  const [weekData, setWeekData] = useState({});
  const getDoc = async () => {
    if (user) {
      const doc = await GET_DOCUMENT("students", user.uid);
      if (doc?.exists()) {
        const particularsDB: ParticularsInterface = doc.data().PARTICULARS;
        const weeklyProgress: WeekReport = doc.data().WEEKLY_PROGRESS;

        console.log(user.uid);
        console.log({ particularsDB, weeklyProgress });

        if (!particularsDB) {
          setShouldRenderParticulars(true);
        } else {
          //! Change Back to false 
          setShouldRenderParticulars(true);
          dispatch(setParticulars(particularsDB));
        }
        setWeekData(doc.data().WEEKLY_PROGRESS);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2000));
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
    <div className="h-[90vh] overflow-hidden gap-5 flex justify-center items-center">
      {shouldRenderParticulars && <Particulars />}
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
        <AiFillLeftSquare
          size={80}
          className=" stroke-black stroke-[5px] rounded-lg  text-black/10 group-hover:text-[#FF4A1C] group-hover:stroke-0 transition-colors"
        />
        <p className="w-full text-center text-xs font-extrabold group-hover:text-[#FF4A1C] transition-colors">
          Prev Week
        </p>
      </div>
      <div className=" w-2/3 lg:w-2/6 h-full relative">
        {dates.map((date, index) => {
          return particulars?.startDate ? (
            <StudentSheet
              weekData={weekData}
              dates={dates}
              date={date}
              key={index}
              weekID={index}
              startDate={particulars.startDate}
              currentIndex={currentSlide}
              move={move}
            />
          ) : (
            <></>
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
        <AiFillRightSquare
          size={80}
          className=" stroke-black stroke-[5px] rounded-lg  text-black/10 group-hover:text-[#FF4A1C] group-hover:stroke-0 transition-colors"
        />
        <p className="w-full text-center text-xs font-extrabold group-hover:text-[#FF4A1C] transition-colors">
          Next Week
        </p>
      </div>
    </div>
  );
}
