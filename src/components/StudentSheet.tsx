import { current } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import Button from "./Button";

type StudentSheetProps = {
  dates: string[];
  date: string;
  currentIndex: number;
  idNum: number;
  move: number;
} & React.HTMLAttributes<HTMLDivElement>;

export default function StudentSheet(props: StudentSheetProps) {
  useEffect(() => {
    // console.log(props.move);
  }, [props.move]);
  return (
    <div
      style={props.style}
      className={` 
      ${props.idNum === props.currentIndex && "opacity-100"}
      ${
        props.move === -1
          ? props.idNum === props.currentIndex - 1
            ? " -translate-x-full"
            : "translate-x-0"
          : props.idNum === props.currentIndex - 1
          ? "translate-x-full"
          : "translate-x-0"
      }
     
      rounded-t-2xl h-full w-full shadow-lg opacity-0  transition-all duration-[500ms] flex flex-col bg-white/80 absolute`}
    >
      <div className="m-5 mb-0 pb-3 border-b-[1px] border-dotted border-black/60 flex flex-row items-center justify-between">
        <div>
          <p className=" font-bold text-black/60 text-4xl">{props.date}</p>
          <p className="text-sm text-black/50 font-medium pl-2">
            Week {props.idNum + 1} of {props.date.length}
          </p>
        </div>
        <Button className="te" value="Save" />
      </div>
      <div className="container w-full flex-1 flex flex-col p-3 gap-3">
        <div className="dayBlock h-1/5 w-40 bg-black/5 grid place-items-center font-bold scale-1 hover:scale-0">
          Monday
        </div>
        <div className="dayBlock h-1/5 w-40 bg-black/5 grid place-items-center font-bold">
          Tuesday
        </div>
        <div className="dayBlock h-1/5 w-40 bg-black/5 grid place-items-center font-bold">
          Wednesday
        </div>
        <div className="dayBlock h-1/5 w-40 bg-black/5 grid place-items-center font-bold">
          Thursday
        </div>
        <div className="dayBlock h-1/5 w-40 bg-black/5 grid place-items-center font-bold">
          Friday
        </div>
      </div>
    </div>
  );
}
