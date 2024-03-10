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
    coursetype: "",
    courseoption: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubjectInfo({
      ...subjectInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
          coursetype: "",
          courseoption: "",
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
              <select name="coursetype" style={input} value={subjectInfo.coursetype} onChange={handleChange}>
                <option value="">Course Type</option>
                {ltpjOptions.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
              <select name="courseoption" style={input} value={subjectInfo.courseoption} onChange={handleChange}>
                <option value="">Course Option</option>
                {CourseOptions.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" style={sub}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddSubjects;

