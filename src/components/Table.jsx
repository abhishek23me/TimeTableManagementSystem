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


// import React from "react";

// const body1 = {
//   border: "3px solid blue",
//   width: "90%",
//   margin: "35px",
//   borderRadius: "5px",
//   textAlign: "center",
//   boxShadow: "1px 1px 3px 3px rgb(0 0 0/15%)",
//   padding: "0px",
//   height: "300px", // Decreased height
//   fontSize: "20px",
//   backgroundColor: "#ffffcc",
// };
// const tdgrey = {
//   border: "1px solid #000", // Added border for all cells
//   padding: "5px",
// };
// const tr1 = {
//   backgroundColor: "#ccccff",
// };
// const tr2 = {
//   borderRight: "1px solid #000",
//   borderBottom: "1px solid #000",
// };

// // Mock data for demonstration
// const slotsData = [
//   { slotday: "Monday", slottime: "8:30 to 10:00", slotname: "Slot 1" },
//   { slotday: "Monday", slottime: "10:05 to 11:35", slotname: "Slot 2" },
//   { slotday: "Monday", slottime: "11:40 to 13:10", slotname: "Slot 3" },
//   { slotday: "Tuesday", slottime: "8:30 to 10:00", slotname: "Slot 1" },
//   { slotday: "Tuesday", slottime: "10:05 to 11:35", slotname: "Slot 2" },
//   { slotday: "Wednesday", slottime: "14:50 to 16:20", slotname: "Slot 5" },
//   { slotday: "Thursday", slottime: "18:00 to 19:30", slotname: "Slot 7" },
//   { slotday: "Friday", slottime: "18:00 to 19:30", slotname: "Slot 4" },
// ];

// // Function to render the slots for a day
// const renderDaySlots = (daySlots) => {
//   return Array.from({ length: 7 }, (_, index) => {
//     const slot = daySlots.find((slot) => parseInt(slot.slotname.split(" ")[1]) === index + 1);
//     return (
//       <td key={index} style={tdgrey}>
//         {slot ? `Slot ${slot.slotname.split(" ")[1]}` : ""}
//       </td>
//     );
//   });
// };

// function TimeTable() {
//   return (
//     <>
//       <table style={body1}>
//         <thead>
//           <tr style={tr1}>
//             <td rowSpan="2" style={tdgrey}>
//               THEORY
//             </td>
//             <td style={tdgrey}>Start</td>
//             <td style={tdgrey}>8:30</td>
//             <td style={tdgrey}>10:05</td>
//             <td style={tdgrey}>11:40</td>
//             <td style={tdgrey}>13:15</td>
//             <td style={tdgrey}>14:50</td>
//             <td style={tdgrey}>16:25</td>
//             <td style={tdgrey}>18:00</td>
//           </tr>
//           <tr style={tr1}>
//             <td style={tdgrey}>End</td>
//             <td style={tdgrey}>10:00</td>
//             <td style={tdgrey}>11:35</td>
//             <td style={tdgrey}>13:10</td>
//             <td style={tdgrey}>14:45</td>
//             <td style={tdgrey}>16:20</td>
//             <td style={tdgrey}>17:55</td>
//             <td style={tdgrey}>19:30</td>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={tdgrey}>MON</td>
//             <td style={tdgrey}>THEORY</td>
//             {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Monday"))}
//           </tr>
//           <tr>
//             <td style={tdgrey}>TUE</td>
//             <td style={tdgrey}>THEORY</td>
//             {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Tuesday"))}
//           </tr>
//           <tr>
//             <td style={tdgrey}>WED</td>
//             <td style={tdgrey}>THEORY</td>
//             {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Wednesday"))}
//           </tr>
//           <tr>
//             <td style={tdgrey}>THU</td>
//             <td style={tdgrey}>THEORY</td>
//             {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Thursday"))}
//           </tr>
//           <tr>
//             <td style={tdgrey}>FRI</td>
//             <td style={tdgrey}>THEORY</td>
//             {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Friday"))}
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default TimeTable;
