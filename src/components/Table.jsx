import React, { useEffect, useState } from "react";
import img from "../admin.jpg";
import Footer from "./Footer";

function Table() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const tablewhole = {
    width: "90%",
    fontColor: "red",
    justifyContent: "center",
    margin: "40px",
    padding: "50px",
  };
  const tabletr = {
    height: "39%",
    padding: "20px",
    border: "1px solid grey",
    margin: "10px",
    backgroundColor: "grey",
  };
  const tablehr = {
    paddingLeft: "45%",
    backgroundColor: "#afbadc",
    paddingTop: "10px",
    paddingBottom: "10px",
  };
  const tabletd = {
    backgroundColor: "pink",
    fontColor: "red",
    paddingLeft: "10px",
    paddingBottom: "10px",
    paddingTop: "10px",
    width: "40%",
    fontWeight: "bold",
  };
  const tabletd2 = {
    width: "30%",
    backgroundColor: "#d4d3d3",
    border: "1px solid grey",
  };
  const tabletd1 = {
    backgroundColor: "#d4d3d3",
    fontColor: "red",
    paddingLeft: "10px",
    paddingBottom: "10px",
    paddingTop: "10px",
    width: "40%",
  };

  const imgg = {
    width: "126px",
    margin: "auto",
    marginLeft: "29%",
    borderRadius: "14px",
  };
  const mainsa = {
    marginLeft: "5%",
    marginBottom: "267px",
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/auth/userprofile?id=${userId}`);
        const data = await response.json();

        if (data.success) {
          setUserData(data.userProfile);
        } else {
          console.error("User profile not found:", data.message);
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div style={mainsa}>
        <table style={tablewhole}>
          <tbody>
            <tr style={tabletr}>
              <th colSpan={3} style={tablehr}>
                Teacher Information
              </th>
            </tr>
            {userData && (
              <>
                <tr style={tabletr}>
                  <td style={tabletd}>Name of the Faculty</td>
                  <td style={tabletd1}>{userData.name}</td>
                  <td rowSpan={"6"} style={tabletd2}>
                    <img style={imgg} src={img} alt="" />
                  </td>
                </tr>
                <tr style={tabletr}>
                  <td style={tabletd}>Designation</td>
                  <td style={tabletd1}>{userData.designation}</td>
                </tr>
                <tr style={tabletr}>
                  <td style={tabletd}>Name of Department</td>
                  <td style={tabletd1}>{userData.departmentName}</td>
                </tr>
                <tr style={tabletr}>
                  <td style={tabletd}>School / Centre Name</td>
                  <td style={tabletd1}>{userData.schoolCenterName}</td>
                </tr>
                <tr style={tabletr}>
                  <td style={tabletd}>E-Mail Id</td>
                  <td style={tabletd1}>{userData.email}</td>
                </tr>
                <tr style={tabletr}>
                  <td style={tabletd}>Cabin Number</td>
                  <td style={tabletd1}>{userData.cabinNo}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Table;
