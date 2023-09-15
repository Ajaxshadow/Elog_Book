import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import Button from "./Button";
import { SAVE_WEEK_TO_DB } from "../hooks/firestoreHooks";
import WeekSheetMotion from "./WeekSheetMotion";
import { current } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/hooks";

type StudentSheetProps = {
  dates: string[];
  date: string;
  firstWeek:number|null;
  currentIndex: number;
  weekID: number;
  move: number;
  weekData: Object;
  startDate: string;
} & React.HTMLAttributes<HTMLDivElement>;

export type WeekReport = {
  weekID?: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  startDate: string;
};

type dbWeek = {
  id: number;
  data: WeekReport;
};

export default function StudentSheet(props: StudentSheetProps) {
  const weekDate = new Date(props.startDate);

  const [weekSaved, setWeekSaved] = useState(false);
  const [DBhasData, setDBhasData] = useState(false);
  const [weekDataEdited, setWeekDataEdited] = useState(false);
  const [weekReport, setWeekReport] = useState<WeekReport>({
    weekID: props.weekID + 1,
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    startDate: "",
  });

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const [height2, setHeight2] = useState(0);
  const [heightNew, setHeightNew] = useState(0);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(props.startDate);
    console.log(weekDate);
    if (ref.current !== null && ref2.current !== null) {
      const height1 = ref.current.offsetHeight;
      const height2 = ref2.current.offsetHeight;

      setHeight(ref.current.offsetHeight);
      setHeight2(ref2.current.offsetHeight);

      const newHeight = ref.current.offsetHeight - ref2.current.offsetHeight;
      setHeightNew(newHeight);

      console.log({ heightNew });
    }
  }, []);

  useEffect(() => {
    if (props.weekData) {
      Object.entries(props.weekData).forEach((weekData) => {
        let id: number = Number.parseInt(weekData[0].split("_")[1]);
        let data: WeekReport = weekData[1];
        if (props.weekID + 1 === id) {
          setDBhasData(true);
          setWeekReport(data);
        }
      });
    }
  }, [props.weekData]);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setWeekSaved(false);
    const name = event.target.name;
    const text = event.target.value;
    setWeekDataEdited(true);
    setWeekReport((prev) => ({
      ...prev,
      [name]: text,
    })); 

    // console.log(weekReport);
  };
  const user = useAppSelector((state) => state.app.user);
  const saveWeekData = () => {
    // console.log(idString);
    user &&
      SAVE_WEEK_TO_DB(weekReport, user)
        .then(() => {
          setWeekSaved(true);
          setTimeout(() => {
            setWeekSaved(false);
            setWeekDataEdited(false);
          }, 1000);
        })
        .catch((err) => console.log(err));
  };
  return (
    <div
      ref={ref}
      style={props.style}
      className={` StudentSheet
      ${
        props.weekID === props.currentIndex
          ? "opacity-100"
          : " pointer-events-none"
      }
      ${
        props.move === -1
          ? props.weekID === props.currentIndex - 1
            ? " -translate-x-full"
            : "translate-x-0"
          : props.weekID === props.currentIndex - 1
          ? "translate-x-full"
          : "translate-x-0"
      }
      
     
       rounded-t-2xl h-full w-full shadow-lg opacity-0  transition-all duration-[500ms] flex flex-col bg-white/80 absolute`}
    >
      <div ref={ref2} className=" h-fit">
        <div className="p-5 mb-0 pb-3 border-b-[1px] border-dotted border-black/60 flex flex-row items-center justify-between">
          <div className="flex-1">
            <p className=" font-bold text-black/60 text-4xl">{props.date}</p>
            <p className="text-sm text-black/50 font-medium pl-2">
              Week {props.weekID + 1} of {props.dates.length}
            </p>
          </div>
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-end">
            <Button
              handleClick={saveWeekData}
              value={
                weekSaved
                  ? "Saved!"
                  : DBhasData && weekDataEdited
                  ? "Update"
                  : "Save"
              }
              Right={weekSaved ? AiFillCheckCircle : null}
            />
          </div>
        </div>
      </div>

      <div
        className={`h-[${heightNew}px] max-h-[${heightNew}] w-full self-center`}
      >
        <WeekSheetMotion
          firstWeek={props.firstWeek}
          height={heightNew}
          handleTextAreaChange={handleTextAreaChange}
          weekReport={weekReport}
        />
      </div>
    </div>
  );
}
