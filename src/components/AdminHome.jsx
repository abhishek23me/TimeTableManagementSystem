import React, { useState } from 'react'
import AdminSideBar from './AdminSideBar'
import Register from "./Register";
import ChangePassword from './ChangePassword';
import FacultySearch from './FacultySearch';
import Table from './Table';


function AdminHome() {
  const [showHome, setShowHome] = useState(false);

  const handleHomeClick = () => {
    // setShowHome(true);
    setRegisterFaculty(false);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(false);
  };

  const [registerFaculty, setRegisterFaculty] = useState(false);

  const handleRegisterFacultyClick = () => {
    setRegisterFaculty(true);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(false);
  };

  const [showChangePassword, setChangePassword] = useState(false);

  const handleChangePasswordClick = () => {
    setChangePassword(true);
    setRegisterFaculty(false);
    setFacultySearch(false);
  };

  const [showTable, setShowTable] = useState(false);

  const handleSidebarClick = () => {
    console.log("Sidebar clicked");
    setShowTable(true);
    setChangePassword(false);
    setRegisterFaculty(false);
    setFacultySearch(false);
  };

  const [showFacultySearch, setFacultySearch] = useState(false);

  const handleFacultySearchClick = () => {
    setFacultySearch(true);
    setShowTable(false);
    setChangePassword(false);
    setRegisterFaculty(false);
  };

  return (
    <div>
      <AdminSideBar onFacultySearchClick={handleFacultySearchClick} onSidebarClick={handleSidebarClick} onChangePasswordClick={handleChangePasswordClick} onShowHomeClick={handleHomeClick} onRegisterFacultyClick={handleRegisterFacultyClick} />
      {showTable && <Table />}
      {registerFaculty && <Register />}
      {showChangePassword && <ChangePassword />}
      {showFacultySearch && <FacultySearch />}
    </div>
  )
}

export default AdminHome;
