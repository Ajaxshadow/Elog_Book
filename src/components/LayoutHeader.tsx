import { LayoutLoggedIn } from "./LayoutLoggedIn";
import { LayoutNoUser } from "./LayoutNoUser";
import React from "react";
import { useAppSelector } from "../app/hooks";

export default function LayoutHeader() {
  const user = useAppSelector((state)=>state.app.user);
  if (user !== null) {
    return <LayoutLoggedIn></LayoutLoggedIn>;
  } else {
    return <LayoutNoUser />;
  }
}
