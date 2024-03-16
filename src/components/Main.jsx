import React, { useState } from "react";
import SideBar from "./SideBar";
import Table from "./Table";
import Spotlight from "./Spotlight";
import ChangePassword from "./ChangePassword";
import ContactUs from "./ContactUs";
import TimeTable from "./TimeTable";
import SubjectSelect from "./SubjectSelect";

function Main() {
  const [showTable, setShowTable] = useState(false);

  const handleSidebarClick = () => {
    console.log("profile clicked");
    setShowContactUs(false);
    setChangePassword(false);
    setShowTable(true);
    setShowHome(false);
    setShowTimeTable(false);
    setShowGenTimeTable(false);

    // setShowHome(false);
  };
  const [showHome, setShowHome] = useState(false);

  const handleHomeClick = () => {
    // setShowHome(true);
    setShowTable(false);
    setChangePassword(false);
    setShowContactUs(false);
    setShowTimeTable(false);
    setShowGenTimeTable(false);
  };

  const [showChangePassword, setChangePassword] = useState(false);

  const handleChangePasswordClick = () => {
    // setShowHome(true);
    setChangePassword(true);
    setShowTable(false);
    setShowHome(false);
    setShowContactUs(false);
    setShowTimeTable(false);
    setShowGenTimeTable(false);

  };

  const [showContactUs,setShowContactUs]=useState(false);

  const handleContactUsClick =()=>{
    setShowContactUs(true);
    setChangePassword(false);
    setShowTable(false);
    setShowHome(false);
    setShowTimeTable(false);
    setShowGenTimeTable(false);
  }

  const [showTimeTable, setShowTimeTable] = useState(false);

  const handleTimeTableClick = () => {
    setShowTimeTable(true);
    setShowContactUs(false);
    setChangePassword(false);
    setShowTable(false);
    setShowHome(false);
    setShowGenTimeTable(false);

  };

  const [showGenTimeTable, setShowGenTimeTable] = useState(false);

  const handleGenTimeTableClick = () => {
    setShowTimeTable(false);
    setShowContactUs(false);
    setChangePassword(false);
    setShowTable(false);
    setShowHome(false);
    setShowGenTimeTable(true);

  };

  return (
    <div>
      <SideBar onSidebarClick={handleSidebarClick}  onShowHomeClick={handleHomeClick} onChangePasswordClick={handleChangePasswordClick} onContactUsClick={handleContactUsClick} onTimeTableClick={handleTimeTableClick} onGenTimeTableClick={handleGenTimeTableClick} />
      {!showTable && !showChangePassword && !showContactUs && !showTimeTable && !showGenTimeTable  && <Spotlight/>}
      {showTable && <Table />}
      {showChangePassword && <ChangePassword/> }
      {showContactUs && <ContactUs/> }
      {showTimeTable && <TimeTable/> }
      {showGenTimeTable && <SubjectSelect/>}
    </div>
  );
}

export default Main;


// import React, { useState, useEffect } from "react";

// const SubjectSelect = () => {
//   const [subject, setSubject] = useState("");
//   const [subjectsData, setSubjectsData] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [allSlots, setAllSlots] = useState([]);
//   const [okButtonDisabled, setOkButtonDisabled] = useState(false);

//   const handleSubjectChange = (event) => {
//     const selectedSubject = event.target.value;
//     setSubject(selectedSubject);
//     const credit =
//       subjectsData.find((subj) => subj.coursetitle === selectedSubject)
//         ?.credit || 0;
//     setSelectedSlots(new Array(credit - 1).fill(""));
//   };

//   const handleSlotChange = (index, event) => {
//     const selectedSlot = allSlots.find(
//       (slot) => slot.slotname === event.target.value
//     );
//     if (selectedSlot) {
//       const updatedSelectedSlots = [...selectedSlots];
//       updatedSelectedSlots[index] = {
//         slotname: selectedSlot.slotname,
//         slotday: selectedSlot.slotday,
//         slottime: selectedSlot.slottime,
//       };
//       setSelectedSlots(updatedSelectedSlots);
//     }
//   };

//   const handleOK = async (index) => {
//     const selectedSlot = selectedSlots[index];
//     if (selectedSlot && subject) {
//       try {
//         console.log("Selected Slot Name:", selectedSlot.slotname);
//         console.log("Selected Slot Day:", selectedSlot.slotday);
//         console.log("Selected Slot Time:", selectedSlot.slottime);

//         // Find the subject by title
//         const selectedSubject = subjectsData.find(
//           (subj) => subj.coursetitle === subject
//         );
//         if (!selectedSubject) {
//           throw new Error("Selected subject not found");
//         }

//         // Create the updated subject object with the selected slot data
//         let updatedSubject = { ...selectedSubject }; // Get the existing subject data

//         if (index === 0) {
//           updatedSubject.Fslotname = selectedSlot.slotname;
//           updatedSubject.Fslotday = selectedSlot.slotday;
//           updatedSubject.Fslottime = selectedSlot.slottime;
//         } else if (index === 1) {
//           updatedSubject.Sslotname = selectedSlot.slotname;
//           updatedSubject.Sslotday = selectedSlot.slotday;
//           updatedSubject.Sslottime = selectedSlot.slottime;
//         } else if (index === 2) {
//           updatedSubject.Tslotname = selectedSlot.slotname;
//           updatedSubject.Tslotday = selectedSlot.slotday;
//           updatedSubject.Tslottime = selectedSlot.slottime;
//         }

//         // Make the PUT request to update the subject in the database
//         const response = await fetch(
//           `/api/subject/updateslots/${selectedSubject._id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedSubject),
//           }
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to update subject data");
//         }

//         // Show an alert for successful update
//         alert(`Slot ${selectedSlot.slotname} selected and updated in the database.`);

//         // Update the availability of the selected slot
//         const updatedSlots = allSlots.map((slot) => {
//           if (slot.slotname === selectedSlot.slotname) {
//             return { ...slot, available: false };
//           }
//           return slot;
//         });

//         // Update state to reflect the change in availability
//         setAllSlots(updatedSlots);

//         // Update the OK button status
//         if (index === selectedSlots.length - 1) {
//           setOkButtonDisabled(true);
//         }
//       } catch (error) {
//         console.error("Error updating slot:", error);
//         setError("Error updating slot. Please try again later.");
//       }
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       // Find the subject by title
//       const selectedSubject = subjectsData.find(
//         (subj) => subj.coursetitle === subject
//       );
//       if (!selectedSubject) {
//         throw new Error("Selected subject not found");
//       }
  
//       // Create the updated subject object with all the selected slot data
//       let updatedSubject = { ...selectedSubject }; // Get the existing subject data
//       updatedSubject.Fslotname = selectedSlots[0]?.slotname || "empty";
//       updatedSubject.Fslotday = selectedSlots[0]?.slotday || "empty";
//       updatedSubject.Fslottime = selectedSlots[0]?.slottime || "empty";
//       updatedSubject.Sslotname = selectedSlots[1]?.slotname || "empty";
//       updatedSubject.Sslotday = selectedSlots[1]?.slotday || "empty";
//       updatedSubject.Sslottime = selectedSlots[1]?.slottime || "empty";
//       updatedSubject.Tslotname = selectedSlots[2]?.slotname || "empty";
//       updatedSubject.Tslotday = selectedSlots[2]?.slotday || "empty";
//       updatedSubject.Tslottime = selectedSlots[2]?.slottime || "empty";
  
//       // Make the PUT request to update the subject in the database
//       const subjectResponse = await fetch(
//         `/api/subject/updateslots/${selectedSubject._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedSubject),
//         }
//       );
  
//       const subjectData = await subjectResponse.json();
  
//       if (!subjectResponse.ok) {
//         throw new Error(
//           subjectData.message || "Failed to update subject data"
//         );
//       }
  
//       // Show an alert for successful subject update
//       alert(`Slots selected and updated for the subject.`);
  
//       // Update the availability of the selected subject
//       const updatedSubjectData = { ...selectedSubject, available: false };
  
//       // Make the PUT request to update the subject's availability in the database
//       const updateAvailabilityResponse = await fetch(
//         `/api/subject/updateAvailability/${selectedSubject._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedSubjectData),
//         }
//       );
  
//       const updateAvailabilityData = await updateAvailabilityResponse.json();
  
//       if (!updateAvailabilityResponse.ok) {
//         throw new Error(
//           updateAvailabilityData.message ||
//             "Failed to update subject availability"
//         );
//       }
  
//       // Update the availability of the selected slots to false
//       const updatedSlots = allSlots.map((slot) => {
//         if (
//           selectedSlots.some(
//             (selectedSlot) => selectedSlot.slotname === slot.slotname
//           )
//         ) {
//           return { ...slot, available: false };
//         }
//         return slot;
//       });
  
//       setAllSlots(updatedSlots);
  
//       // Now, update the user with the selected subject ID
//       const selectedSubjectId = selectedSubject._id;
  
//       // Get the userId from localStorage
//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//         throw new Error("User ID not found in localStorage");
//       }
  
//       // Fetch the user by ID to get current subject fields
//       const userResponse = await fetch(`/api/auth/userbyid/${userId}`);
//       const userData = await userResponse.json();
  
//       if (!userResponse.ok) {
//         throw new Error(userData.message || "Failed to fetch user");
//       }
  
//       const currentUser = userData.user;
  
//       // Update the subject fields based on availability
//       if (!currentUser.subject1) {
//         currentUser.subject1 = selectedSubjectId;
//       } else if (!currentUser.subject2) {
//         currentUser.subject2 = selectedSubjectId;
//       } else if (!currentUser.subject3) {
//         currentUser.subject3 = selectedSubjectId;
//       } else {
//         alert("User has already selected 3 subjects");
//       }
  
//       // Make a PUT request to update the User document with the new subject ID
//       const userUpdateResponse = await fetch(`/api/auth/${userId}/subjects`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(currentUser),
//       });
  
//       const userUpdateData = await userUpdateResponse.json();
  
//       if (!userUpdateResponse.ok) {
//         throw new Error(userUpdateData.message || "Failed to update user");
//       }
  
//       // Show an alert for successful user update
//       alert(`Subject updated successfully for the user!`);
  
//       // Reset form after submission
//       setSelectedSlots([]);
//       setSubject("");
//       setOkButtonDisabled(false);
  
//       // Refresh subjects data after submission
//       fetchSubjectsData();
  
//       // Alert for successful update of selected slots' availability
//       alert("Selected slots' availability updated successfully.");
//     } catch (error) {
//       console.error("Error updating slots and subjects:", error);
//       alert("Failed to update slots and subjects. Please try again.");
//     }
//   };
  

//   const fetchSubjectsData = async () => {
//     try {
//       const response = await fetch("/api/subject/allAvailableSubjects");
//       if (!response.ok) {
//         throw new Error("Failed to fetch available subjects");
//       }
//       const data = await response.json();
//       setSubjectsData(data.subjects);
//     } catch (error) {
//       console.error("Error fetching subjects data:", error);
//       setError("Error fetching subjects data. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     fetchSubjectsData();
//   }, []);

//   useEffect(() => {
//     const fetchAllSlots = async () => {
//       try {
//         const response = await fetch("/api/slot/allSlots");
//         if (!response.ok) {
//           throw new Error("Failed to fetch slots");
//         }
//         const data = await response.json();
//         setAllSlots(data.slots);
//       } catch (error) {
//         console.error("Error fetching slots data:", error);
//         setError("Error fetching slots data. Please try again later.");
//       }
//     };

//     fetchAllSlots();
//   }, []);

//   return (
//     <div
//       style={{
//         background: "#f0f0f0",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//         padding: "20px",
//         marginTop: "24px",
//         width: "700px",
//         margin: "0 auto",
//       }}
//     >
//       <div style={styles.title}>
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           Time Table
//         </h2>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <i style={styles.icons} className="fa-solid fa-book"></i>
//           <select
//             value={subject}
//             onChange={handleSubjectChange}
//             style={styles.input}
//           >
//             <option value="">Select Subject</option>
//             {subjectsData.map((subject) => (
//               <option
//                 key={subject._id}
//                 value={subject.coursetitle}
//               >{`${subject.coursetitle} - Course Code: ${subject.coursecode} - Credits: ${subject.credit}`}</option>
//             ))}
//           </select>
//         </div>

//         {selectedSlots.map((slot, index) => (
//           <div key={index} style={{ marginTop: "20px" }}>
//             <i style={styles.icons} className="fa-solid fa-calendar-days"></i>
//             <select
//               value={slot.slotname || ""}
//               onChange={(event) => handleSlotChange(index, event)}
//               style={styles.input}
//             >
//               <option value="">Select Slot, Day & Time</option>
//               {allSlots.map((slot) => (
//                 <option
//                   key={slot._id}
//                   value={slot.slotname}
//                   disabled={!slot.available}
//                 >{`${slot.slotname} - Day: ${slot.slotday} - Time: ${slot.slottime}`}</option>
//               ))}
//             </select>
//             <button
//               type="button"
//               style={styles.okButton}
//               onClick={() => handleOK(index)}
//               disabled={!slot.slotname || okButtonDisabled}
//             >
//               OK
//             </button>
//           </div>
//         ))}

//         <button type="submit" style={styles.sub}>
//           Submit
//         </button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// const styles = {
//   title: {
//     height: "80px",
//     background: "#127faa",
//     borderRadius: "5px 5px 0 0",
//     color: "#fff",
//     fontSize: "35px",
//     fontWeight: "600",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   icons: {
//     position: "absolute",
//     width: "47px",
//     height: "6%",
//     color: "#fff",
//     marginTop: "40px",
//     fontSize: "24px",
//     background: "#127faa",
//     border: "1px solid #1ba2b4",
//     borderRadius: "5px 0 0 5px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   input: {
//     height: "43px",
//     width: "100%",
//     outline: "none",
//     paddingLeft: "60px",
//     borderRadius: "5px",
//     border: "1px solid lightgrey",
//     fontSize: "20px",
//     marginTop: "10px",
//     transition: "all 0.3s ease",
//     color: "black",
//   },
//   okButton: {
//     height: "43px",
//     marginTop: "10px",
//     background: "#127faa",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginLeft: "10px",
//   },
//   sub: {
//     background: "#127faa",
//     borderRadius: "5px",
//     marginLeft: "260px",
//     marginTop: "40px",
//     color: "white",
//     width: "150px",
//     fontSize: "19px",
//     border: "3px solid #1ba2b4",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// };

// export default SubjectSelect;
