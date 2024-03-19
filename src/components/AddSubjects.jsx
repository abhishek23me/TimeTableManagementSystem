import React, { useState } from "react";

function AddSubjects() {
  const container = {
    maxWidth: "600px",
    padding: "0 20px",
    margin: "40px auto",
  };

  const wrapper = {
    width: "100%",
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 4px 10px 1px rgba(0, 0, 0, 1)",
  };

  const title = {
    height: "90px",
    background: "#127faa",
    borderRadius: "5px 5px 0 0",
    color: "#fff",
    fontSize: "35px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const forms = {
    padding: "35px 85px 35px 35px",
  };

  const row = {
    height: "45px",
    marginBottom: "15px",
    position: "relative",
  };

  const input = {
    height: "100%",
    width: "100%",
    outline: "none",
    paddingLeft: "60px",
    borderRadius: "5px",
    border: "1px solid lightgrey",
    fontSize: "20px",
    marginBottom: "10px",
    transition: "all 0.3s ease",
    color: "black",
  };

  const icons = {
    position: "absolute",
    width: "47px",
    height: "100%",
    color: "#fff",
    fontSize: "18px",
    background: "#127faa",
    border: "1px solid #1ba2b4",
    borderRadius: "5px 0 0 5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const back = {
    width: "440px",
    backgroundColor: "light-blue",
  };

  const sub = {
    background: "#127faa",
    borderRadius: "5px",
    marginLeft: "140px",
    marginTop: "10px",
    color: "white",
    width: "150px",
    fontSize: "19px",
    border: "3px solid #1ba2b4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const ltpjOptions = [
    "Lecture & Tutorial, practical hour only",
    "Lecture & Practical hour only",
    "Lecture & Tutorial hour only",
    "Project only",
  ];

  const CourseOptions = ["Regular", "Not Regular"];

  // Dropdown options for coursesemester
  const semesterOptions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const [subjectInfo, setSubjectInfo] = useState({
    category: "",
    coursetitle: "",
    coursecode: "",
    ntr: "",
    version: "",
    lecture: "",
    practical: "",
    tutorial: "",
    project: "",
    credit: "",
    coursevenue: "",
    coursetype: "",
    courseoption: "",
    coursesemester: "", 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubjectInfo({
      ...subjectInfo,
      [name]: value,
    });
  };

  const handleCourseVenueChange = (event) => {
    const { value } = event.target;
    setSubjectInfo({
      ...subjectInfo,
      coursevenue: value.toUpperCase(), // Convert to uppercase
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation logic
    if (!validateForm()) {
      return;
    }

    try {

      const courseCodeResponse = await fetch(`http://localhost:3000/api/subject/checkcoursecode/${subjectInfo.coursecode}`);
      const ntrResponse = await fetch(`http://localhost:3000/api/subject/checkntr/${subjectInfo.ntr}`);
  
      if (!courseCodeResponse.ok || !ntrResponse.ok) {
        throw new Error('Network response was not ok');
      }
  
      const courseCodeData = await courseCodeResponse.json();
      const ntrData = await ntrResponse.json();
  
      if (courseCodeData.exists) {
        alert("Course code already exists. Please choose a different course code.");
        return;
      }
  
      if (ntrData.exists) {
        alert("NTR already exists. Please choose a different NTR.");
        return;
      }
  
      // Validation logic
      if (!validateForm()) {
        return;
      }
      const response = await fetch("http://localhost:3000/api/subject/addsubjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subjectInfo),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("Subject added successfully!");
        setSubjectInfo({
          category: "",
          coursetitle: "",
          coursecode: "",
          ntr: "",
          version: "",
          lecture: "",
          practical: "",
          tutorial: "",
          project: "",
          credit: "",
          coursevenue: "",
          coursetype: "",
          courseoption: "",
          coursesemester: "", // Clear coursesemester after submission
        });
      } else {
        console.error(data.message);
        alert("An error occurred while adding the subject.");
      }
    } catch (error) {
      console.error("Error adding the subject:", error);
      alert("An error occurred while adding the subject.");
    }
  };

  // Form validation logic
  const validateForm = () => {
    // Regular expressions for validation
   const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    const numericRegex = /^[0-9]+$/;
    const creditRegex = /^[2-9][0-9]{1,2}$/;

    // Validate course title (only alphabetic characters)
    if (!subjectInfo.coursetitle.match(/^[a-zA-Z\s]*$/)) {
      alert("Course title must contain only alphabetic characters.");
      return false;
    }

   const alphanumericRegex2 = /^(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!alphanumericRegex2.test(subjectInfo.coursecode)) {
      alert("Course code must be alphanumeric and contain at least one character and one digit.");
      return false;
    }

    // Validate NTR (alphanumeric, at least one character, and contains at least one digit)
const alphanumericRegex1 = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
if (!alphanumericRegex1.test(subjectInfo.ntr)) {
  alert("NTR must be alphanumeric and contain at least one character and one digit.");
  return false;
}

    // Validate NTR (must be unique)
    // Add your unique validation logic here

    // Validate version (only 1 or 2)
if (!['1', '2'].includes(subjectInfo.version)) {
  alert("Version must be either 1 or 2.");
  return false;
}

  // Validate lecture, practical, tutorial, project (only 1, 2, or 3)
const allowedValues = ['1', '2', '0'];
if (!allowedValues.includes(subjectInfo.lecture) || !allowedValues.includes(subjectInfo.practical) || !allowedValues.includes(subjectInfo.tutorial) || !allowedValues.includes(subjectInfo.project)) {
  alert("Lecture, practical, tutorial, and project must be either 1, 2, or 0.");
  return false;
}

// Validate credit (only 2, 3, or 4)
const validCreditValues = ["2", "3", "4"];
if (!validCreditValues.includes(subjectInfo.credit)) {
  alert("Credit must be either 2, 3, or 4.");
  return false;
}


  // Validate course venue (must be integer and no more than 3 digits)

if (!numericRegex.test(subjectInfo.coursevenue) || subjectInfo.coursevenue.length > 3) {
  alert("Course venue must be an integer with no more than 3 digits.");
  return false;
}


    // Validation passed
    return true;
  };

  return (
    <div style={container}>
      <div style={wrapper}>
        <div style={title}>
          <span>CREDIT INFO</span>
        </div>
        <form style={forms} onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <div style={row}>
              <i className="fa-solid fa-list" style={icons}></i>
              <input
                type="text"
                name="category"
                placeholder="Category Name"
                style={input}
                value={subjectInfo.category}
                onChange={handleChange}
              />
            </div>
            <div style={back}>
              <input
                type="text"
                name="coursetitle"
                placeholder="Course Title"
                style={input}
                value={subjectInfo.coursetitle}
                onChange={handleChange}
              />
              <input
                type="text"
                name="coursecode"
                placeholder="Course Code"
                style={input}
                value={subjectInfo.coursecode}
                onChange={handleChange}
              />
              <input
                type="text"
                name="ntr"
                placeholder="NTR"
                style={input}
                value={subjectInfo.ntr}
                onChange={handleChange}
              />
              <input
                type="number"
                name="version"
                placeholder="Version"
                style={input}
                value={subjectInfo.version}
                onChange={handleChange}
              />
              <input
                type="number"
                name="lecture"
                placeholder="Lecture"
                style={input}
                value={subjectInfo.lecture}
                onChange={handleChange}
              />
              <input
                type="number"
                name="practical"
                placeholder="Practical"
                style={input}
                value={subjectInfo.practical}
                onChange={handleChange}
              />
              <input
                type="number"
                name="tutorial"
                placeholder="Tutorial"
                style={input}
                value={subjectInfo.tutorial}
                onChange={handleChange}
              />
              <input
                type="number"
                name="project"
                placeholder="Project"
                style={input}
                value={subjectInfo.project}
                onChange={handleChange}
              />
              <input
                type="number"
                name="credit"
                placeholder="Credit"
                style={input}
                value={subjectInfo.credit}
                onChange={handleChange}
              />
              <input
                type="text"
                name="coursevenue"
                placeholder="Course Venue"
                style={input}
                value={subjectInfo.coursevenue}
                onChange={handleCourseVenueChange}
              />
              <select
                name="coursetype"
                style={input}
                value={subjectInfo.coursetype}
                onChange={handleChange}
              >
                <option value="">Course Type</option>
                {ltpjOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                name="courseoption"
                style={input}
                value={subjectInfo.courseoption}
                onChange={handleChange}
              >
                <option value="">Course Option</option>
                {CourseOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                name="coursesemester"
                style={input}
                value={subjectInfo.coursesemester}
                onChange={handleChange}
              >
                <option value="">Course Semester</option>
                {semesterOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" style={sub}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSubjects;
