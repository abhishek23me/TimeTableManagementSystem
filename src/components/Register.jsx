import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    facultyName: "",
    designation: "",
    departmentName: "",
    schoolCenterName: "",
    cabinNo: "",
    password: "",
  });

  const [inputFocus, setInputFocus] = useState(false);
  const navigate = useNavigate();

  const container = {
    maxWidth: '600px',
    padding: '0 20px',
    margin: '40px auto',
  };

  const wrapper = {
    width: '100%',
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px 1px rgba(0, 0, 0, 1)',
  };

  const title = {
    height: '90px',
    background: '#127faa',
    borderRadius: '5px 5px 0 0',
    color: '#fff',
    fontSize: '35px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const forms = {
    padding: '35px 85px 35px 35px',
  };

  const row = {
    height: '45px',
    marginBottom: '15px',
    position: 'relative',
  };

  const input = {
    height: '100%',
    width: '100%',
    outline: 'none',
    paddingLeft: '60px',
    borderRadius: '5px',
    border: '1px solid lightgrey',
    fontSize: '20px',
    transition: 'all 0.3s ease',
    borderColor: inputFocus ? '#21b6ca' : 'lightgrey',
    boxShadow: inputFocus ? 'inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25)' : 'none',
    '::placeholder': {
      color: '#999',
    },
  };

  const icons = {
    position: 'absolute',
    width: '47px',
    height: '100%',
    color: '#fff',
    fontSize: '18px',
    background: '#127faa',
    border: '1px solid #1ba2b4',
    borderRadius: '5px 0 0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const button = {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: '0px',
    background: '#16a085',
    border: '1px solid green',
    cursor: 'pointer',
    textAlign: "center",
    width: "439px",
    fontSize: "25px",
    height: "49px",
    borderRadius: "2px",
    boxShadow: "1px 1px 3px 3px rgb(0 0 0/15%)",
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      const json = await response.json();
      console.log(json);
  
      if (response.ok) {
        // Redirect to login page if user creation is successful
        navigate('/login');
      } else {
        console.error(json.error);
        // Handle error scenarios here, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle network errors or other exceptions here
    }
  };
  

  return (
    <div style={container}>
      <div style={wrapper}>
        <div style={title}><span>Teacher Registration Form</span></div>
        <form style={forms} onSubmit={handleSubmit}>
          <div style={row}>
            <i className="fas fa-user" style={icons}></i>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              style={input}
              value={credentials.username}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-chalkboard-teacher" style={icons}></i>
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              style={input}
              value={credentials.name}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-envelope" style={icons}></i>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              style={input}
              value={credentials.email}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-user-tie" style={icons}></i>
            <input
              type="text"
              placeholder="Designation"
              name="designation"
              required
              style={input}
              value={credentials.designation}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-building" style={icons}></i>
            <input
              type="text"
              placeholder="Department Name"
              name="departmentName"
              required
              style={input}
              value={credentials.departmentName}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-school" style={icons}></i>
            <input
              type="text"
              placeholder="School/Center Name"
              name="schoolCenterName"
              required
              style={input}
              value={credentials.schoolCenterName}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-map-marker-alt" style={icons}></i>
            <input
              type="text"
              placeholder="Cabin No"
              name="cabinNo"
              required
              style={input}
              value={credentials.cabinNo}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-lock" style={icons}></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              style={input}
              value={credentials.password}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <input type="submit" value="Register" style={button} />
        </form>
      </div>
    </div>
  );
}

export default Register;
