import React from "react";

function Spotlight() {
  const dashbord = {
    backgroundColor: "white",
    marginLeft: "2%",
    marginTop:"10px",
    height: "116px",
    width: "96%",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0/15%)",
    borderRadius: "5px",
  };

  const item = {
    backgroundColor: "#f7f7f7",
    height: "67px",
    fontSize: "24.5px",
    margin: "0px 0px 7px",
    fontWeight: "700",
    paddingLeft: "6px",
  };

  return (
    <div style={dashbord}>
      <div style={item}>Spotlight</div>
    </div>
  );
}

export default Spotlight;
