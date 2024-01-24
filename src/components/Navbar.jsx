import React from "react";
import logo from "../VITLogoEmblem.png";

const Navbar = () => {
  const logos = {
    height: "44px",
    width: "116px",
    backgroundColor: "#2455a3",
    marginLeft:"10px",
    marginTop:"5px",
  };

  const navbar = {
    backgroundColor:"#2455a3",
    height:"54px",
  };

  return (
    <div style={navbar}>
      <img style={logos} src={logo} alt="logo chrayaua not found" />
    </div>
  );
};

export default Navbar;
