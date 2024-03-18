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

// import React, { useState, useEffect } from "react";

// const body = {
//   border: "3px solid grey",
//   width: "90%",
//   margin: "35px",
//   borderRadius: "5px",
//   boxShadow: "1px 1px 3px 3px rgba(0, 0, 0, 0.15)",
//   padding: "0px",
//   backgroundColor: "white",
// };

// const thead = {
//   fontSize: "23px",
//   fontWeight: "bold",
//   borderLeft: "1px solid grey",
//   color: "white",
//   padding: "10px",
//   margin: "0px",
// };

// const thro1 = {
//   backgroundColor: "rgb(49, 98, 176)",
// };

// const thro2 = {
//   fontSize: "23px",
// };

// const tabletd = {
//   backgroundColor: "white",
//   borderLeft: "1px solid grey",
//   paddingLeft: "10px",
//   paddingTop: "10px",
//   paddingBottom: "10px",
// };

// const list = {
//   listStyleType: "none",
//   textAlign: "left",
//   margin: "0",
//   padding: "5px",
// };

// function TimeTable() {
//   const [timetableData, setTimetableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTimetableData = async () => {
//       try {
//         let userId = localStorage.getItem("userId");

//         // Check if userId is a valid ObjectId format
//         if (!isValidObjectId(userId)) {
//           throw new Error("Invalid userId format");
//         }

//         const response = await fetch(`/api/auth/fetchtimetable/${userId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch timetable data");
//         }

//         const data = await response.json();

//         if (data.success) {
//           const subjectsData = [];

//           // Fetch subject data for each subject ID
//           for (let i = 1; i <= 3; i++) {
//             const subjectId = data[`subject${i}`];
//             if (subjectId) {
//               const subjectResponse = await fetch(`/api/subject/fetchsubject/${subjectId}`);
//               if (!subjectResponse.ok) {
//                 throw new Error(`Failed to fetch subject with ID: ${subjectId}`);
//               }
//               const subjectData = await subjectResponse.json();
//               subjectsData.push(subjectData);
//             }
//           }

//           // Combine timetable data with subjects data
//           const updatedTimetableData = subjectsData.map((subjectData, index) => {
//             return {
//               subjectData,
//               // You can add more properties here based on your requirements
//             };
//           });

//           setTimetableData(updatedTimetableData);
//         } else {
//           throw new Error(data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching timetable data:", error.message);
//         setError("Failed to fetch timetable data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTimetableData();
//   }, []);

//   // Function to check if a string is a valid ObjectId
//   const isValidObjectId = (id) => {
//     const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
//     return checkForHexRegExp.test(id);
//   };

//   return (
//     <>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <table style={body}>
//           <tbody>
//             <tr style={thro1}>
//               <th style={thead}>SI.No</th>
//               <th style={thead}>Category</th>
//               <th style={thead}>Course Title</th>
//               <th style={thead}>
//                 <ul style={list}>
//                   <li>L T</li>
//                   <li>P J</li>
//                   <li>C</li>
//                 </ul>
//               </th>
//               <th style={thead}>Course Code</th>
//               <th style={thead}>Course Option</th>
//               <th style={thead}>Class NTR</th>
//               <th style={thead}>Slot-Venue</th>
//               <th style={thead}>Subject Data</th>
//             </tr>

//             {timetableData.map((item, index) => (
//               <tr key={index} style={thro2}>
//                 <td style={tabletd}>{index + 1}</td>
//                 <td style={tabletd}>{item.category}</td>
//                 <td style={tabletd}>{item.coursetitle}</td>
//                 <td style={tabletd}>
//                   <ul style={list}>
//                     <li>
//                       {item.lecture} {item.tutorial}
//                     </li>
//                     <li>
//                       {item.practical} {item.project}
//                     </li>
//                     <li>{item.credit}</li>
//                   </ul>
//                 </td>
//                 <td style={tabletd}>{item.coursecode}</td>
//                 <td style={tabletd}>{item.courseoption}</td>
//                 <td style={tabletd}>{item.ntr}</td>
//                 <td style={tabletd}>
//                   {item.Fslotname} - {item.Fslotday} - {item.Fslottime}
//                   <br />
//                   {item.Sslotname} - {item.Sslotday} - {item.Sslottime}
//                   <br />
//                   {item.Tslotname} - {item.Tslotday} - {item.Tslottime}
//                 </td>
//                 <td style={tabletd}>
//                   {item.subjectData ? (
//                     <>
//                       <div>Subject Name: {item.subjectData.name}</div>
//                       <div>Subject Code: {item.subjectData.code}</div>
//                       {/* Add more fields as needed */}
//                     </>
//                   ) : (
//                     <div>No Subject Data</div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </>
//   );
// }

// export default TimeTable;
