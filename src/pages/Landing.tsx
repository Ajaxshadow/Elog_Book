import logo from "../assets/Logo.svg";
import BGCircles from "../assets/BGCircles.svg";
import BGBoy from "../assets/BGBoy.png";
import AboutCircle from "../assets/AboutCircle.svg";
import { ReactComponent as SpinCircle } from "../assets/AboutCircle.svg";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Landing() {
  // Set loading state to true initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    return <></>;
  }
  return (
    <div
      style={{
        backgroundImage: `url(${BGCircles})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
      }}
      className=" h-[90vh] flex  flex-col justify-center relative"
    >
      <div className="boy_holder w-full h-full absolute pointer-events-none">
        <div className="absolute w-full bottom-0">
          <div className=" w-full bg-[#246C5A]/60 h-5"></div>
          <div className=" w-full bg-[#246C5A]/70 h-5"></div>
          <div className=" w-full bg-[#246C5A]/80 h-5"></div>
        </div>
        <img src={BGBoy} className="absolute right-0 bottom-0 w-1/2" />
      </div>
      <section className="container px-10 lg:px-60 pb-20">
        <div>
          <p className="text-[#6C6C6C] uppercase font-semibold md:text-lg pl-10">
            Easily track <span className="text-[#FF4A1C]">Student...</span>
          </p>
          <div className=" capitalize font-bold md:text-6xl text-center md:text-left">
            <span className="text-[#FF4A1C]"> progress & attendance </span>
            <br />
            Stay organized, set goals, <br />
            and access feedback
          </div>
          <p className="w-2/3 text-lg mt-4">
            Students can use this log book system to set personal goals, track
            their own progress, and stay organized with deadlines and
            assignments.{" "}
          </p>
          <div className="flex gap-3 mt-10 relative w-fit pr-3">
            <Button linkTO="/login" value="Log In"></Button>
            <div className="group">
              <Button linkTO="/login" value="About" secondary></Button>
              <div className=" absolute h-full top-0 aspect-square left-full ">
                <SpinCircle className=" animate-spin-slow duration-2000 w-full h-full group-hover:animate-spin" />
                <div className=" w-3/5 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF4A1C]/30 overflow-hidden">
                  <div className="bg-[#FF4A1C] absolute w-full h-full top-full left-0 group-hover:top-0 transition-all duration-500"></div>
                  <div className="w-full h-full flex items-center justify-center z-50 absolute right-full group-hover:right-0 transition-all duration-500 delay-200">
                    <AiOutlineArrowRight color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
