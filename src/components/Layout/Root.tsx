import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Root: React.FC<{}> = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
