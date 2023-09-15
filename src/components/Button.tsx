import { IconBaseProps, IconType } from "react-icons";

import { Link } from "react-router-dom";
import React from "react";

type ButtonProps = {
  cta?: boolean;
  value: string | any;
  linkTO?: string;
  primary?: boolean;
  secondary?: boolean;
  slimmer?: boolean;
  loading?: boolean;
  square?: boolean;
  Right?: React.ElementType | null;
  handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & React.HTMLAttributes<HTMLButtonElement>;
function Button({
  linkTO = "",
  value,
  square,
  loading,
  secondary = false,
  slimmer = false,
  Right,
  handleClick,
  className,
}: ButtonProps) {
  return (
    <Link className={className} onClick={handleClick} to={linkTO}>
      <div
        className={` whitespace-nowrap self-center w-fit relative flex flex-row items-center gap-2 text-white 
        ${square ? "py-2 px-2" : "px-5 "}
        ${slimmer ? "py-1" : "py-3"} rounded-md overflow-hidden group ${
          secondary ? "bg-[#FF4A1C]" : "bg-[#246C5A]"
        }`}
      >
        <div>
          <div className=" w-full h-full absolute bg-white/30 top-full left-0 group-hover:top-0 transition-all"></div>
          <div>{loading ? "loading" : value}</div>
        </div>
        {Right && <Right size={20} />}
      </div>
    </Link>
  );
}

export default Button;
