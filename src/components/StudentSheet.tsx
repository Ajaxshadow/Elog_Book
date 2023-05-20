import { current } from "@reduxjs/toolkit";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Button from "./Button";
import { SAVE_WEEK_TO_DB } from "../hooks/firestoreHooks";
import { useAppSelector } from "../app/hooks";
import { AiFillCheckCircle } from "react-icons/ai";

type StudentSheetProps = {
  dates: string[];
  date: string;
  currentIndex: number;
  weekID: number;
  move: number;
  weekData: Object;
} & React.HTMLAttributes<HTMLDivElement>;

export type WeekReport = {
  weekID?: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
};

type dbWeek = {
  id: number;
  data: WeekReport;
};

export default function StudentSheet(props: StudentSheetProps) {
  const [weekSaved, setWeekSaved] = useState(false);
  const [weekReport, setWeekReport] = useState<WeekReport>({
    weekID: props.weekID + 1,
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
  });

  useEffect(() => {
    Object.entries(props.weekData).forEach((weekData) => {
      let id: number = Number.parseInt(weekData[0].split("_")[1]);
      let data: WeekReport = weekData[1];
      if (props.weekID + 1 === id) {
        setWeekReport(data);
      }
    });
  }, [props.weekData]);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setWeekSaved(false);
    const name = event.target.name;
    const text = event.target.value;
    setWeekReport((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  const user = useAppSelector((state) => state.app.user);
  const saveWeekData = () => {
    // console.log(idString);
    user &&
      SAVE_WEEK_TO_DB(weekReport, user)
        .then(() => setWeekSaved(true))
        .catch((err) => console.log(err));
  };
  return (
    <div
      style={props.style}
      className={` 
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
      <div className="m-5 mb-0 pb-3 border-b-[1px] border-dotted border-black/60 flex flex-row items-center justify-between">
        <div>
          <p className=" font-bold text-black/60 text-4xl">{props.date}</p>
          <p className="text-sm text-black/50 font-medium pl-2">
            Week {props.weekID + 1} of {props.dates.length}
          </p>
        </div>
        <Button
          handleClick={saveWeekData}
          value={weekSaved ? "Saved!" : "Save"}
          Right={weekSaved ? AiFillCheckCircle : null}
        />
      </div>

      <div className="container w-full flex-1 flex flex-col p-3 gap-3">
        <div className="dayBlock h-1/5 w-full  flex flex-row gap-3 transition-all duration-1000 hover:h-full group">
          <div className="dayBlock h-full w-40 bg-[#EEEEEF] grid place-items-center font-bold group-hover:border-2 group-hover:border-r-0 group-hover:border-t-[#FF4A1C] group-hover:border-l-[#FF4A1C] group-hover:border-b-[#FF4A1C] rounded-l-lg  cursor-pointer group-hover:bg-[#FF4A1C]/10 transition-all text-black/70">
            Monday
          </div>
          <textarea
            onChange={handleTextAreaChange}
            name="monday"
            value={weekReport.monday}
            placeholder="Description of Work-Done on Monday"
            style={{ resize: "none" }}
            className="bg-[#EEEEEF] font-sans flex-1 p-2 focus:outline-none group-hover:border-r-[#FF4A1C] group-hover:border-b-[#FF4A1C] group-hover:border-t-[#FF4A1C] rounded-r-lg group-hover:border-2 group-hover:border-l-0 placeholder:text-center"
          ></textarea>
        </div>
        <div className="dayBlock h-1/5 w-full  flex flex-row gap-3 transition-all duration-1000 hover:h-full group">
          <div className="dayBlock h-full w-40 bg-[#EEEEEF] grid place-items-center font-bold group-hover:border-2 group-hover:border-r-0 group-hover:border-t-[#FF4A1C] group-hover:border-l-[#FF4A1C] group-hover:border-b-[#FF4A1C] rounded-l-lg  cursor-pointer group-hover:bg-[#FF4A1C]/10 transition-all text-black/70">
            Tuesday
          </div>
          <textarea
            onChange={handleTextAreaChange}
            name="tuesday"
            value={weekReport.tuesday}
            placeholder="Description of Work-Done on Tuesday"
            style={{ resize: "none" }}
            className="bg-[#EEEEEF] font-sans flex-1 p-2 focus:outline-none group-hover:border-r-[#FF4A1C] group-hover:border-b-[#FF4A1C] group-hover:border-t-[#FF4A1C] rounded-r-lg group-hover:border-2 group-hover:border-l-0 placeholder:text-center"
          ></textarea>
        </div>
        <div className="dayBlock h-1/5 w-full  flex flex-row gap-3 transition-all duration-1000 hover:h-full group">
          <div className="dayBlock h-full w-40 bg-[#EEEEEF] grid place-items-center font-bold group-hover:border-2 group-hover:border-r-0 group-hover:border-t-[#FF4A1C] group-hover:border-l-[#FF4A1C] group-hover:border-b-[#FF4A1C] rounded-l-lg  cursor-pointer group-hover:bg-[#FF4A1C]/10 transition-all text-black/70">
            Wednesday
          </div>

          <textarea
            onChange={handleTextAreaChange}
            name="wednesday"
            value={weekReport.wednesday}
            placeholder="Description of Work-Done on Wednesday"
            style={{ resize: "none" }}
            className="bg-[#EEEEEF] font-sans flex-1 p-2 focus:outline-none group-hover:border-r-[#FF4A1C] group-hover:border-b-[#FF4A1C] group-hover:border-t-[#FF4A1C] rounded-r-lg group-hover:border-2 group-hover:border-l-0 placeholder:text-center"
          ></textarea>
        </div>
        <div className="dayBlock h-1/5 w-full  flex flex-row gap-3 transition-all duration-1000 hover:h-full group">
          <div className="dayBlock h-full w-40 bg-[#EEEEEF] grid place-items-center font-bold group-hover:border-2 group-hover:border-r-0 group-hover:border-t-[#FF4A1C] group-hover:border-l-[#FF4A1C] group-hover:border-b-[#FF4A1C] rounded-l-lg  cursor-pointer group-hover:bg-[#FF4A1C]/10 transition-all text-black/70">
            Thursday
          </div>
          <textarea
            onChange={handleTextAreaChange}
            name="thursday"
            value={weekReport.thursday}
            placeholder="Description of Work-Done on Thursday"
            style={{ resize: "none" }}
            className="bg-[#EEEEEF] font-sans flex-1 p-2 focus:outline-none group-hover:border-r-[#FF4A1C] group-hover:border-b-[#FF4A1C] group-hover:border-t-[#FF4A1C] rounded-r-lg group-hover:border-2 group-hover:border-l-0 placeholder:text-center"
          ></textarea>
        </div>
        <div className="dayBlock h-1/5 w-full  flex flex-row gap-3 transition-all duration-1000 hover:h-full group">
          <div className="dayBlock h-full w-40 bg-[#EEEEEF] grid place-items-center font-bold group-hover:border-2 group-hover:border-r-0 group-hover:border-t-[#FF4A1C] group-hover:border-l-[#FF4A1C] group-hover:border-b-[#FF4A1C] rounded-l-lg  cursor-pointer group-hover:bg-[#FF4A1C]/10 transition-all text-black/70">
            Friday
          </div>
          <textarea
            onChange={handleTextAreaChange}
            name="friday"
            value={weekReport.friday}
            placeholder="Description of Work-Done on Friday"
            style={{ resize: "none" }}
            className="bg-[#EEEEEF] font-sans flex-1 p-2 focus:outline-none group-hover:border-r-[#FF4A1C] group-hover:border-b-[#FF4A1C] group-hover:border-t-[#FF4A1C] rounded-r-lg group-hover:border-2 group-hover:border-l-0 placeholder:text-center"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
