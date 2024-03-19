import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net'; // Import DataTables CSS and JS

function SubjectsSearch() {
  const [subjectsData, setSubjectsData] = useState([]);

  useEffect(() => {
    fetchSubjectsData();
  }, []);

  useEffect(() => {
    if (subjectsData.length > 0) {
      $('#example').DataTable();
    }

    return () => {
      $('#example').DataTable().destroy();
    };
  }, [subjectsData]);

  const fetchSubjectsData = async () => {
    try {
      const response = await fetch('/api/subject/allSubjects');
      const data = await response.json();
      setSubjectsData(data.subjects);
    } catch (error) {
      console.error('Error fetching subjects data:', error);
    }
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

  const itemStyle = {
    backgroundColor: "#f7f7f7",
    height: "55px",
    fontSize: "23.5px",
    margin: "0px 0px 7px",
    fontWeight: "730",
    color: "blue",
    paddingLeft: "6px",
  };

  const thro1 = {
    backgroundColor: "rgb(49 98 176)",
    color: "white",
    fontSize: "12px",
  };

  const icons = {
    width: '47px',
    height: '100%',
    color: '#fff',
    fontSize: '20px',
    margin: "2px",
    background: '#127faa',
    border: '1px solid #1ba2b4',
    borderRadius: '4px',
  };

  const icon = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    color: '#fff',
    fontSize: '38px',
    background: '#127faa',
    border: '1px solid #1ba2b4',
    borderRadius: '4px',
    paddingLeft: "8px",
    paddingBottom: "5px",
    paddingTop: "5px",
    right: "15px",
    top: "3.5%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  const he1 = {
    backgroundColor: "white",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0/15%)",
    height: "110px",
    paddingLeft: "3px",
    paddingRight: "3px",
  };

  const updateIcon = <i className="fas fa-pencil-alt"></i>;
  const deleteIcon = <i className="fas fa-trash-alt"></i>;

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/subject/subjectstodelete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSubjectsData(subjectsData.filter((subject) => subject._id !== id));
        console.log('Subject deleted successfully');
      } else {
        console.error('Failed to delete subject');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

const handleUpdate = (id) => {
    window.location.href = `/updatesubjects/${id}`;
};
  return (
    <div>
      <div style={{ ...dashbordStyle, overflowX: 'auto' }}>
        <div style={he1}>
          <div style={itemStyle}>CURRICULUM  </div>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table id='example' className="display">
              <thead>
                <tr style={thro1}>
                  <th>CATEGORY</th>
                  <th>COURSE TITLE</th>
                  <th>Course Code</th>
                  <th>NTR</th>
                  <th>COURSE OPTION</th>
                  <th>VERSION</th>
                  <th>CREDITS</th>
                  <th>L</th>
                  <th>T</th>
                  <th>P</th>
                  <th>J</th>
                  <th>COURSE TYPE</th>
                  <th>SEMESTER</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {subjectsData.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.category}</td>
                    <td>{subject.coursetitle}</td>
                    <td>{subject.coursecode}</td>
                    <td>{subject.ntr}</td>
                    <td>{subject.courseoption}</td>
                    <td>{subject.version}</td>
                    <td>{subject.credit}</td>
                    <td>{subject.lecture}</td>
                    <td>{subject.tutorial}</td>
                    <td>{subject.practical}</td>
                    <td>{subject.project}</td>
                    <td>{subject.coursetype}</td>
                    <td>{subject.coursesemester}</td>
                    <td>
                      <button style={icons} onClick={() => handleUpdate(subject._id)}>{updateIcon}</button>
                      <button style={icons} onClick={() => handleDelete(subject._id)}>{deleteIcon}</button>
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

export default SubjectsSearch;
