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

  const he1 = {
    backgroundColor: "white",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0/15%)",
    height: "110px",
    paddingLeft: "3px",
    paddingRight: "3px",
  };
  
  const itemStyle = {
    backgroundColor: "#f7f7f7",
    height: "55px",
    fontSize: "23.5px",
    margin: "0px 0px 7px",
    fontWeight: "730",
    color: "blue",
    paddingLeft: "4px",
  };
 
  const dashbordStyle = {
    marginLeft: "2.5%",
    margin: "20px",
    height: "550px",
    fontSize: "10px",
    width: "96%",
    padding: "4.5px",
    borderRadius: "5px",
    position: "relative",
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
  const viewIcon= <i className="fa-solid fa-eye"></i>

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
  const handleView = (id) => {
    window.location.href =`/viewprofile/${id}`;
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
    <div>
      <div style={{ ...dashbordStyle, overflowX: 'auto' }}>
        <div style={he1}>
          <div style={itemStyle}>Faculty Information  </div>
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
              <th>Location</th>
              <th>History</th>
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
                <td style={centeredText}>{user.location}</td>
                <td style={centeredText}><button style={icons} onClick={() => handleView(user._id)}>
                    {viewIcon}
                  </button></td>

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
    </div>
    </div>
  );
}

export default FacultySearch;