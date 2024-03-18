import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";

function FacultySearch() {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    fetchFacultyData();
  }, []);

  useEffect(() => {
    if (facultyData.length > 0) {
      $("#example").DataTable();
    }

    return () => {
      $("#example").DataTable().destroy();
    };
  }, [facultyData]);

  const fetchFacultyData = async () => {
    try {
      const response = await fetch("/api/auth/all");
      const data = await response.json();
      setFacultyData(data.users);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  const body = {
    width: "94%",
    margin: "25px",
    marginRight: "3px",
    borderRadius: "5px ",
    paddingLeft: "15px",
    paddingBottom: "5px",
    paddingRight: "15px",
    fontSize: "11px",
    backgroundColor: "white",
  };

  const thro1 = {
    backgroundColor: "rgb(49 98 176)",
    color: "white",
    fontSize: "14px",
  };

  const icons = {
    width: "47px",
    height: "100%",
    color: "#fff",
    fontSize: "20px",
    margin: "2px",
    background: "#127faa",
    border: "1px solid #1ba2b4",
    borderRadius: "4px",
  };

  const updateIcon = <i className="fas fa-pencil-alt"></i>;
  const deleteIcon = <i className="fas fa-trash-alt"></i>;

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/auth/userstodelete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFacultyData(facultyData.filter((user) => user._id !== id));
        fetchFacultyData();
        console.log("User deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/updateregister/${id}`;
  };

  // Function to format date to display only date (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toISOString().split("T")[0];
    return formattedDate;
  };

  const centeredText = {
    textAlign: "center",
  };

  return (
    <div style={body}>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table id="example" className="display">
          <thead>
            <tr style={thro1}>
              <th>User Name</th>
              {/* <th>Password</th> */}
              <th>Name of Faculty</th>
              <th>Designation</th>
              <th>Name of Department</th>
              <th>School/Center Name</th>
              <th>Email ID</th>
              <th>Cabin Number</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {facultyData.map((user) => (
              <tr key={user._id}>
                <td style={centeredText}>{user.username}</td>
                {/* <td>{user.password}</td> */}
                <td style={centeredText}>{user.name}</td>
                <td style={centeredText}>{user.designation}</td>
                <td style={centeredText}>{user.departmentName}</td>
                <td style={centeredText}>{user.schoolCenterName}</td>
                <td style={centeredText}>{user.email}</td>
                <td style={centeredText}>{user.cabinNo}</td>
                {/* Format date to display only date (YYYY-MM-DD) */}
                <td style={centeredText}>{formatDate(user.date)}</td>
                <td style={centeredText}>
                  <button style={icons} onClick={() => handleUpdate(user._id)}>
                    {updateIcon}
                  </button>
                  <button style={icons} onClick={() => handleDelete(user._id)}>
                    {deleteIcon}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultySearch;
