import React from "react";

const Footer = () => {
  const footer = {
    backgroundColor: "#2455a3",
    height: "20px",
    width: "100%",
    fontSize: "12px",
    color: "white",
    margin: "auto",
  };

  const text = {
    display:"flex",
    height:"20px",
    marginTop:"20px",
    alignItems:"center",
    justifyContent:"center",
  };

  return (
    <div style={footer}>
        <div style={text}>
        <span>
          Copyright © <span>2024 </span>
          Software Development Cell, VIT, Bhopal-466 114.
        </span>
        </div>
      </div>
  );
};

export default Footer;
