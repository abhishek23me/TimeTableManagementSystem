import React, { useState } from "react";
import SideBar from "./SideBar";
import Table from "./Table";
import Spotlight from "./Spotlight";
import ChangePassword from "./ChangePassword";
import ContactUs from "./ContactUs";
import TimeTable from "./TimeTable";

function Main() {
  const [showTable, setShowTable] = useState(false);

  const handleSidebarClick = () => {
    console.log("profile clicked");
    setShowContactUs(false);
    setChangePassword(false);
    setShowTable(true);
    setShowHome(false);
    setShowTimeTable(false);

    // setShowHome(false);
  };
  const [showHome, setShowHome] = useState(false);

  const handleHomeClick = () => {
    // setShowHome(true);
    setShowTable(false);
    setChangePassword(false);
    setShowContactUs(false);
    setShowTimeTable(false);
  };

  const [showChangePassword, setChangePassword] = useState(false);

  const handleChangePasswordClick = () => {
    // setShowHome(true);
    setChangePassword(true);
    setShowTable(false);
    setShowHome(false);
    setShowContactUs(false);
    setShowTimeTable(false);

  };

  const [showContactUs,setShowContactUs]=useState(false);

  const handleContactUsClick =()=>{
    setShowContactUs(true);
    setChangePassword(false);
    setShowTable(false);
    setShowHome(false);
    setShowTimeTable(false);
  }

  const [showTimeTable, setShowTimeTable] = useState(false);

  const handleTimeTableClick = () => {
    setShowTimeTable(true);
    setShowContactUs(false);
    setChangePassword(false);
    setShowTable(false);
    setShowHome(false);

  };

  return (
    <div>
      <SideBar onSidebarClick={handleSidebarClick}  onShowHomeClick={handleHomeClick} onChangePasswordClick={handleChangePasswordClick} onContactUsClick={handleContactUsClick} onTimeTableClick={handleTimeTableClick} />
      {showTable && <Table />}
      {!showTable && !showChangePassword && !showContactUs && !showTimeTable && <Spotlight/>}
      {showChangePassword && <ChangePassword/> }
      {showContactUs && <ContactUs/> }
      {showTimeTable && <TimeTable/> }
    </div>
  );
}

export default Main
