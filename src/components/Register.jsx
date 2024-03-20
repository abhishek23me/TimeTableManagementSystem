import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    // facultyName: "",
    designation: "",
    departmentName: "",
    schoolCenterName: "",
    cabinNo: "",
    password: "",
  });

  const [inputFocus, setInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

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

    // Validation
    if (!validateUsername(credentials.username)) {
      alert("Username must have at least one character and one integer.");
      return;
    }

    if (!validateAlphabetsOnly(credentials.name)) {
      alert("Name should contain only alphabets and maximum of 30 characters.");
      return;
    }

    if (!validateAlphabetsOnly(credentials.schoolCenterName)) {
      alert("School/Center name should contain only alphabets and maximum of 30 characters.");
      return;
    }

    if (!validateCabinNo(credentials.cabinNo)) {
      alert("Cabin No must be only integer and not more than five digits.");
      return;
    }

    if (!validatePassword(credentials.password)) {
      alert("Password must be maximum 20 characters and contain at least one integer, one special symbol, and one character.");
      return;
    }


    try {
      // Check if the username already exists
      const usernameResponse = await fetch(`http://localhost:3000/api/auth/checkusername/${credentials.username}`);
      if (!usernameResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const usernameData = await usernameResponse.json();

      if (usernameData.exists) {
        alert("Username already exists. Please choose a different username.");
        return;
      }


      // Check if the cabin number already exists
      const cabinResponse = await fetch(`http://localhost:3000/api/auth/checkcabin/${credentials.cabinNo}`);
      if (!cabinResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const cabinData = await cabinResponse.json();

      if (cabinData.exists) {
        alert("Cabin number already exists. Please choose a different cabin number.");
        return;
      }

      // Check if the email already exists
      // Check if the email already exists
      const emailResponse = await fetch(`http://localhost:3000/api/auth/checkemail/${credentials.email}`);
      if (!emailResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const emailData = await emailResponse.json();

      if (emailData.exists) {
        alert("Email already exists. Please use a different email address.");
        return;
      }

      const createUserResponse = await fetch(`http://localhost:3000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await createUserResponse.json();
      console.log(json);

      if (createUserResponse.ok) {
        // Redirect to login page if user creation is successful
        navigate('/login');
      } else {
        console.error(json.error);
        // Handle error scenarios here, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle network errors or other exceptions here
      alert("An error occurred while processing your request. Please try again later.");
    }

  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation Functions
  const validateUsername = (username) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
    return regex.test(username);
  };

  const validateAlphabetsOnly = (value) => {
    const regex = /^[A-Za-z ]{1,30}$/;
    return regex.test(value);
  };

  const validateCabinNo = (cabinNo) => {
    const regex = /^\d{1,5}$/;
    return regex.test(cabinNo);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&])(?=.*[a-zA-Z]).{1,20}$/;
    return regex.test(password);
  };
  
  // locationOptions = ['Bhopal', 'Sehore', 'Astha', 'Hosteller'];

  return (
    <div style={container}>
      <div style={wrapper}>
        <div style={title}><span>Faculty Registration Form</span></div>
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
            <i className="fa-solid fa-calendar-days" style={icons}></i>
            <input
              type="date"
              placeholder="date"
              name="date"
              required
              style={input}
              value={credentials.date}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fa-solid fa-map-marker-alt" style={icons}></i> {/* Icon for location */}
            <select
              name="location"
              style={input} // Apply your desired styling here
              value={credentials.location}
              onChange={onChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            >
              {/* <option value="">Location</option> Default option */}
              <option value="Bhopal">Bhopal</option>
              <option value="Sehore">Sehore</option>
              <option value="Hosteller">Hosteller</option>
              <option value="Astha">Astha</option>
            </select>
          </div>




          <div style={row}>
            <i className="fas fa-lock" style={icons} onClick={togglePasswordVisibility}></i>
            <input
              type={showPassword ? "text" : "password"} // Show plain text if showPassword is true
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