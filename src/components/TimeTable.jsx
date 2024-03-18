import React, { useState, useEffect } from "react";

const body1 = {
  border: "3px solid blue",
  width: "90%",
  margin: "35px",
  borderRadius: "5px",
  textAlign: "center",
  boxShadow: "1px 1px 3px 3px rgb(0 0 0/15%)",
  padding: "0px",
  height: "300px",
  fontSize: "20px",
  backgroundColor: "#ffffcc",
};
const tdgrey = {
  border: "1px solid #000",
  padding: "5px",
};
const tr1 = {
  backgroundColor: "#ccccff",
};
const tr2 = {
  borderRight: "1px solid #000",
  borderBottom: "1px solid #000",
};

function TimeTable() {
  const [userSubjects, setUserSubjects] = useState([]);
  const [userData, setUserData] = useState({});
  const [slotIds, setSlotIds] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Fetch user data
        const userDataResponse = await fetch(`/api/auth/userbyid/${userId}`);
        const userData = await userDataResponse.json();
        setUserData(userData);

        // Check for user's subjects and populate the state
        if (userData.success) {
          const subjects = [];
          if (userData.user.subject1) subjects.push(userData.user.subject1);
          if (userData.user.subject2) subjects.push(userData.user.subject2);
          if (userData.user.subject3) subjects.push(userData.user.subject3);

          // Log the subjects before fetching
          console.log("Subjects before fetching:", subjects);

          const fetchedSubjects = await fetchAndAddSubjects(subjects);

          // Set the state with fetched subjects
          setUserSubjects(fetchedSubjects);

          // Extract and store slotIds
          const extractedSlotIds = extractSlotIds(fetchedSubjects);
          setSlotIds(extractedSlotIds);
        }

        console.log("User Data:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAndAddSubjects = async (subjects) => {
      try {
        const subjectDataArray = await Promise.all(
          subjects.map(async (subjectId) => {
            const response = await fetch(`/api/subject/${subjectId}`);
            if (response.ok) {
              return await response.json();
            } else {
              console.error(`Subject ${subjectId} not found`);
              return null;
            }
          })
        );

        // Filter out null values (for failed fetches)
        const filteredSubjects = subjectDataArray.filter((subject) => subject !== null);
        console.log("All Subjects Data:", filteredSubjects);

        return filteredSubjects;
      } catch (error) {
        console.error("Error fetching subjects:", error);
        return [];
      }
    };

    const extractSlotIds = (subjects) => {
      return subjects.map((subject) => {
        return {
          FslotId: subject.FslotId || "N/A",
          SslotId: subject.SslotId || "N/A",
          TslotId: subject.TslotId || "N/A",
        };
      });
    };

    fetchUserData();
  }, []);

  // Function to render the slots for a day
  const renderDaySlots = (daySlots) => {
    return Array.from({ length: 7 }, (_, index) => {
      const slot = daySlots.find((slot) => parseInt(slot.slotname.split(" ")[1]) === index + 1);
      return (
        <td key={index} style={tdgrey}>
          {slot ? `Slot ${slot.slotname.split(" ")[1]}` : ""}
        </td>
      );
    });
  };

  console.log("All Slot IDs:", slotIds);

  return (
    <>
      <table style={body1}>
        <thead>
          <tr style={tr1}>
            <td rowSpan="2" style={tdgrey}>
              THEORY
            </td>
            <td style={tdgrey}>Start</td>
            <td style={tdgrey}>8:30</td>
            <td style={tdgrey}>10:05</td>
            <td style={tdgrey}>11:40</td>
            <td style={tdgrey}>13:15</td>
            <td style={tdgrey}>14:50</td>
            <td style={tdgrey}>16:25</td>
            <td style={tdgrey}>18:00</td>
          </tr>
          <tr style={tr1}>
            <td style={tdgrey}>End</td>
            <td style={tdgrey}>10:00</td>
            <td style={tdgrey}>11:35</td>
            <td style={tdgrey}>13:10</td>
            <td style={tdgrey}>14:45</td>
            <td style={tdgrey}>16:20</td>
            <td style={tdgrey}>17:55</td>
            <td style={tdgrey}>19:30</td>
          </tr>
        </thead>
        <tbody>
          {userSubjects.length > 0 &&
            userSubjects.map((subject, index) => (
              <tr key={index}>
                <td style={tdgrey}>{subject?.coursecode || "N/A"}</td>
                <td style={tdgrey}>F: {slotIds[index]?.FslotId || "N/A"}</td>
                <td style={tdgrey}>S: {slotIds[index]?.SslotId || "N/A"}</td>
                <td style={tdgrey}>T: {slotIds[index]?.TslotId || "N/A"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default TimeTable;
