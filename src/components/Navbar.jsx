import React from "react";
import logo from "../VITLogoEmblem.png";

const Navbar = () => {
  const logos = {
    height: "44px",
    width: "116px",
    // backgroundColor: "#2455a3",
    marginLeft:"10px",
    marginTop:"5px",
  };

  const navbar = {
    // backgroundColor:"#2455a3",
      opacity: "1",
      background: "linear-gradient(to right, #2455a3, rgb(99 149 228),#2455a3)",
      height:"54px",
  };

  return (
    <div style={navbar}>
      <img style={logos} src={logo} alt="logo not found" />
    </div>
  );
};

export default Navbar;
