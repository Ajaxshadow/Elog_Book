import React, { useState } from "react";

import { IoMdLock } from "react-icons/io";
import { LayoutGroup } from "framer-motion";
import { WeekReport } from "./StudentSheet";
import { motion } from "framer-motion";

type Tog = {
  hovered?: number;
  content: string;
  id: number;
  setHoveredId: any;
  children?: any;
  mainContainerHeight: number;
  disabled: boolean
};

function ToggleContent({
  hovered = -1,
  content,
  id,
  setHoveredId,
  children,
  disabled,
  mainContainerHeight,
}: Tog) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`EntryWeekMotion group  rounded-md gap-3 h-[20%] flex flex-row py-2 box-border mx-3`}
      layout
      layoutId="hoverWeek"
      animate={
        id === hovered
          ? { height: mainContainerHeight * 0.6 + "px" }
          : hovered === -1
            ? { height: mainContainerHeight * 0.2 + "px" }
            : { height: mainContainerHeight * 0.1 + "px" }
      }
      // transition={{ type: "spring", damping: 10, stiffness: 100 }}
      // animate={isOpen && { height: "10%" }}
      onMouseEnter={() => {
        !disabled && setIsOpen(!isOpen);
        !disabled && setHoveredId(id);
      }}
      onMouseLeave={() => {
        !disabled && setIsOpen(!isOpen);
        !disabled && setHoveredId(-1);
      }}
    >
      {children}
    </motion.div>
  );
}

type WeekSheetMotionProps = {
  handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  weekReport: WeekReport;
  height: number;
  firstWeek: number | null;
};

export default function WeekSheetMotion({
  handleTextAreaChange,
  weekReport,
  height,
  firstWeek
}: WeekSheetMotionProps) {
  const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const [hoveredId, setHoveredId] = useState<number>();
  const [lock, setLock] = useState<number | undefined>(undefined);

  const updateId = (id: number) => {
    // console.log(id);
    if (lock == undefined) {
      setHoveredId(id);
    }
  };
  const toggleLock = (i: number | undefined) => {
    console.log(i)
    if (lock == i) { setLock(undefined) }
    else { setHoveredId(i); setLock((i)) }
  }
  return (
    <LayoutGroup>
      {weekDays.map((day, index) => {
        const isDisabled = firstWeek != null && firstWeek > index + 1
        return (
          <ToggleContent
            mainContainerHeight={height}
            disabled={isDisabled}
            id={index}
            key={index}
            content={day}
            setHoveredId={updateId}

            hovered={hoveredId}
          >
            <div className={` relative w-40  capitalize {aspect-square} grid place-items-center 
            font-bold border-2  border-black/20 border-r-0  rounded-l-lg  ≈
               transition-all text-black/60 ${isDisabled ? " line-through  group-hover:bg-black/40 text-black/30" : "cursor-pointer bg-[#EEEEEF]  group-hover:bg-[#FF4A1C]/10 group-hover:border-r-0 group-hover:border-t-[#FF4A1C] group-hover:border-l-[#FF4A1C] group-hover:border-b-[#FF4A1C]"}`}>
              {day}
              <div onClick={() => { toggleLock(index) }} className={`lock    transition-opacity duration-300 border-black border-2 rounded-full absolute left-2 top-2 p-1 group-hover:opacity-100 ${typeof lock == "number" && lock >= 0 && index == hoveredId ? "bg-[#FF4A1C]" : " opacity-0"}`}><IoMdLock color={typeof lock == "number" && lock >= 0 && index == hoveredId ? "white" : "black"} />
              </div>
            </div>
            <textarea
              onChange={handleTextAreaChange}
              name={`${day}`}
              value={weekReport[day as keyof WeekReport]}
              placeholder={!isDisabled ? `Description of Work-Done on ${day}` : "Do not fill"}
              style={{
                resize: "none",
                backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 0px)",
                paddingInline: 20,
                backgroundSize: "100% 1.5em",
                // backgroundPositionY: "1.5rem",
                lineHeight: "1.5em",
              }}
              className={` overflow-hidden border-r-black/20 border-t-black/20 border-b-black/20 group-hover:overflow-y-scroll  font-sans flex-1 p-2 focus:outline-none rounded-r-lg border-2 group-hover:border-l-0 placeholder:text-center ${isDisabled ? "" : "bg-[#EEEEEF] group-hover:border-r-[#FF4A1C] group-hover:border-b-[#FF4A1C] group-hover:border-t-[#FF4A1C] "}`}
            ></textarea>
          </ToggleContent>
        );
      })}
    </LayoutGroup>
  );
}
