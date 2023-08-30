import { motion } from "framer-motion";
import React, { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { WeekReport } from "./StudentSheet";

type Tog = {
  hovered?: number;
  content: string;
  id: number;
  setHoveredId: any;
  children?: any;
  mainContainerHeight: number;
};

function ToggleContent({
  hovered = -1,
  content,
  id,
  setHoveredId,
  children,
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
        setIsOpen(!isOpen);
        setHoveredId(id);
      }}
      onMouseLeave={() => {
        setIsOpen(!isOpen);
        setHoveredId(-1);
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
};

export default function WeekSheetMotion({
  handleTextAreaChange,
  weekReport,
  height,
}: WeekSheetMotionProps) {
  const weeks = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const [hoveredId, setHoveredId] = useState<number>();

  const updateId = (id: number) => {
    // console.log(id);
    setHoveredId(id);
  };
  return (
    <LayoutGroup>
      {weeks.map((week, index) => {
        return (
          <ToggleContent
            mainContainerHeight={height}
            id={index}
            key={index}
            content={week}
            setHoveredId={updateId}
            hovered={hoveredId}
          >
            <div className=" w-40 bg-[#EEEEEF] capitalize aspect-square grid place-items-center font-bold group-hover:border-2 group-hover:border-r-0 group-hover:border-t-[#FF4A1C] group-hover:border-l-[#FF4A1C] group-hover:border-b-[#FF4A1C] rounded-l-lg  cursor-pointer group-hover:bg-[#FF4A1C]/10 transition-all text-black/60">
              {week}
            </div>
            <textarea
              onChange={handleTextAreaChange}
              name={`${week}`}
              value={weekReport[week as keyof WeekReport]}
              placeholder={`Description of Work-Done on ${week}`}
              style={{ resize: "none" }}
              className="overflow-hidden group-hover:overflow-y-scroll bg-[#EEEEEF] font-sans flex-1 p-2 focus:outline-none group-hover:border-r-[#FF4A1C] group-hover:border-b-[#FF4A1C] group-hover:border-t-[#FF4A1C] rounded-r-lg group-hover:border-2 group-hover:border-l-0 placeholder:text-center"
            ></textarea>
          </ToggleContent>
        );
      })}
    </LayoutGroup>
  );
}
