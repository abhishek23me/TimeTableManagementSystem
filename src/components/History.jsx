import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";

function History() {
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

  const viewIcon= <i className="fa-solid fa-eye"></i>

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
          <div style={itemStyle}>Faculty History </div>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table id="example" className="display">
              <thead>
                <tr style={thro1}>
                  <th>Subject</th>
                  <th>Semester</th>
                  <th>Slot</th>
                  <th>Time</th>
                  <th>Day</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Render faculty data here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;