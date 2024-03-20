import React, { useState, useEffect } from "react";

const body = {
  border: "3px solid grey",
  width: "90%",
  margin: "35px",
  borderRadius: "5px ",
  boxShadow: "1px 1px 3px 3px rgb(0 0 0/15%)",
  padding: "0px",
  backgroundColor: "white",
};

const thead = {
  fontSize: "23px",
  fontWeight: "bold",
  borderLeft: "1px solid grey",
  color: "white",
  padding: "10px",
  margin: "0px",
};

const thro1 = {
  backgroundColor: "rgb(49 98 176)",
};

const tabletd = {
  backgroundColor: "white",
  borderLeft: "1px solid grey",
  paddingLeft: "10px",
};

function TimeTable() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchUserSubjects = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.log("User ID not found in localStorage");
          return;
        }

        const response = await fetch(`/api/auth/ab/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log("User Data:", userData);

        const subjectIds = [userData.subject1, userData.subject2, userData.subject3].filter(Boolean);
        fetchSubjectsData(subjectIds);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserSubjects();
  }, []);

  const fetchSubjectsData = async (subjectIds) => {
    try {
      const promises = subjectIds.map(async (subjectId) => {
        const response = await fetch(`/api/subject/data/${subjectId}`);
        const data = await response.json();
        return data;
      });

      const subjectsData = await Promise.all(promises);
      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error fetching subjects data:", error);
    }
  };

  return (
    <>
      <table style={body}>
        <thead style={thro1}>
          <tr>
            <th style={thead}>SI.No</th>
            <th style={thead}>Semester</th>
            <th style={thead}>Course</th>
            <th style={thead}>
              <table>
                <tbody>
                  <tr>
                    <td>L</td>
                    <td>T</td>
                  </tr>
                  <tr>
                    <td>P</td>
                    <td>J</td>
                  </tr>
                  <tr>
                    <td>C</td>
                  </tr>
                </tbody>
              </table>
            </th>
            <th style={thead}>Category</th>
            <th style={thead}>Course Option</th>
            <th style={thead}>Class NTR</th>
            <th style={thead}>Slot-Venue</th>
            <th style={thead}>
              <table>
                <tbody>
                  <tr>
                    <td>Slot1</td>
                    <td>Day1</td>
                    <td>Time1</td>
                  </tr>
                 
                </tbody>
              </table>
            </th>
            <th style={thead}>
              <table>
                <tbody>
                  <tr>
                    <td>Slot2</td>
                    <td>Day2</td>
                    <td>Time2</td>
                  </tr>
                 
                </tbody>
              </table>
            </th>
            <th style={thead}>
              <table>
                <tbody>
                  <tr>
                    <td>Slot3</td>
                    <td>Day3</td>
                    <td>Time3</td>
                  </tr>
                 
                </tbody>
              </table>
            </th>


          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td style={tabletd}>{index + 1}</td>
              <td style={tabletd}>{subject.coursesemester}</td>
              <td style={tabletd}>{subject.coursetitle}</td>
              <td style={tabletd}>
                <table>
                  <tbody>
                    <tr>
                      <td>{subject.lecture}</td>
                      <td>{subject.tutorial}</td>
                    </tr>
                    <tr>
                      <td>{subject.practical}</td>
                      <td>{subject.project}</td>
                    </tr>
                    <tr>
                      <td>{subject.credit}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={tabletd}>{subject.category}</td>
              <td style={tabletd}>{subject.courseoption}</td>
              <td style={tabletd}>{subject.ntr}</td>
              <td style={tabletd}>{subject.coursevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TimeTable;
