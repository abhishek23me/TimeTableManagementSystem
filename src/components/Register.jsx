import React, { useState } from 'react';

function Register() {
  const [inputFocus, setInputFocus] = useState(false);

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
    fontSize: '20px',
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

  const f1={
    height: '100%',
    width: '100%',
    paddingTop:"5px",
    fontSize:"19px",
    paddingLeft: '60px',
    borderRadius: '5px',
    border: '1px solid lightgrey',
    borderColor: inputFocus ? '#21b6ca' : 'lightgrey',
    boxShadow: inputFocus ? 'inset 0px 0px 2px 2px rgba(26, 188, 156, 0.25)' : 'none',

     }
  return (
    
    <div style={container}>
      <div style={wrapper}>
        <div style={title}><span>Teacher Registration Form</span></div>
        <form style={forms}>
          <div style={row}>
            <i className="fas fa-user" style={icons}></i>
            <input
              type="text"
              placeholder="User Name"
              name="nm"
              required
              style={input}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-lock" style={icons}></i>
            <input
              type="password"
              placeholder="Password"
              name="pass"
              required
              style={input}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-chalkboard-teacher" style={icons}></i>
            <input
              type="text"
              placeholder="Name of Faculty"
              name="facultyName"
              required
              style={input}
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
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-building" style={icons}></i>
            <input
              type="text"
              placeholder="Name of Department"
              name="departmentName"
              required
              style={input}
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
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>

          <div style={row}>
            <i className="fas fa-envelope" style={icons}></i>
            <input
              type="email"
              placeholder="Email ID"
              name="email"
              required
              style={input}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>

          <div style={row}>
            <i className="fas fa-map-marker-alt" style={icons}></i>
            <input
              type="text"
              placeholder="Cabin Number"
              name="cabin"
              required
              style={input}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
          </div>
          <div style={row}>
            <i className="fas fa-image" style={icons}></i>
            <input
              type="file"
              name="photo"
              // accept="image/" {/ This attribute specifies the types of files that the server accepts (only images in this case) */}
              // style={input}
              style={f1}
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
