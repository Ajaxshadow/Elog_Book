import React, { useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import StudentSheet from "../components/StudentSheet";

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
  return (
    <div className="h-[90vh] gap-5 pt-14 flex justify-center items-center">
      <div
        className=" cursor-pointer z-50"
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
          className="text-black/40 hover:text-[#FF4A1C] transition-colors"
        />
      </div>
      <div className=" w-2/6 h-full  box-border relative">
        {dates.map((date, index) => {
          return (
            <StudentSheet
              dates={dates}
              date={date}
              key={index}
              idNum={index}
              currentIndex={currentSlide}
              move={move}
              style={{}}
            />
          );
        })}
      </div>
      <div
        className=" cursor-pointer  z-50"
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
          className="text-black/40 hover:text-[#FF4A1C] transition-colors"
        />
      </div>
    </div>
  );
}
