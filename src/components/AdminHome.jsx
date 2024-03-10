import React, { useState } from 'react'
import AdminSideBar from './AdminSideBar'
import Register from "./Register";
import ChangePassword from './ChangePassword';
import FacultySearch from './FacultySearch';
import Table from './Table';
import SubjectsSearch from './SubjectsSearch';
import AddSubjects from './AddSubjects';
import UpdateSubjects from './UpdateSubjects';


function AdminHome() {
  const [showHome, setShowHome] = useState(false);

  const handleHomeClick = () => {
    // setShowHome(true);
    setRegisterFaculty(false);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(false);
    setEditSubjects(false)
    setAddSubjects(false);
    setSubjectsSearch(false);
  };

  const [registerFaculty, setRegisterFaculty] = useState(false);

  const handleRegisterFacultyClick = () => {
    setRegisterFaculty(true);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(false);
    setEditSubjects(false);
    setAddSubjects(false);
    setSubjectsSearch(false);
  };

  const [addSubjects, setAddSubjects] = useState(false);

  const handleAddSubjectClick = () => {
    setRegisterFaculty(false);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(false);
    setEditSubjects(false);
    setAddSubjects(true);
    setSubjectsSearch(false);
  };

  const [showChangePassword, setChangePassword] = useState(false);

  const handleChangePasswordClick = () => {
    setRegisterFaculty(false);
    setChangePassword(true);
    setShowTable(false);
    setFacultySearch(false);
    setEditSubjects(false);
    setAddSubjects(false);
    setSubjectsSearch(false);
  };

  const [showTable, setShowTable] = useState(false);

  const handleSidebarClick = () => {
    setRegisterFaculty(false);
    setChangePassword(false);
    setShowTable(true);
    setFacultySearch(false);
    setEditSubjects(false);
    setAddSubjects(false);
    setSubjectsSearch(false);
  };

  const [editSubjects, setEditSubjects] = useState(false);

  const handleEditSubjectsClick = () => {
    setRegisterFaculty(false);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(false);
    setEditSubjects(true);
    setAddSubjects(false);
    setSubjectsSearch(false);
  };

  const [showFacultySearch, setFacultySearch] = useState(false);

  const handleFacultySearchClick = () => {
    setRegisterFaculty(false);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(true);
    setEditSubjects(false);
    setAddSubjects(false);
    setSubjectsSearch(false);
  };

  const [showSubjectsSearch, setSubjectsSearch] = useState(false);

  const handleSubjectsSearchClick = () => {
    setRegisterFaculty(false);
    setChangePassword(false);
    setShowTable(false);
    setFacultySearch(false);
    setEditSubjects(false);
    setAddSubjects(false);
    setSubjectsSearch(true);
  };

  return (
    <div>
      <AdminSideBar onFacultySearchClick={handleFacultySearchClick} onSubjectsSearchClick={handleSubjectsSearchClick} onEditSubjectsClick={handleEditSubjectsClick} onSidebarClick={handleSidebarClick} onChangePasswordClick={handleChangePasswordClick} onShowHomeClick={handleHomeClick} onRegisterFacultyClick={handleRegisterFacultyClick}  onAddSubjectClick={handleAddSubjectClick} />
      {showTable && <Table />}
      {registerFaculty && <Register />}
      {showChangePassword && <ChangePassword />}
      {showFacultySearch && <FacultySearch />}
      {showSubjectsSearch && <SubjectsSearch/>}
      {addSubjects && <AddSubjects/>}
      {editSubjects && <UpdateSubjects/>}

    </div>
  )
}

export default AdminHome;
