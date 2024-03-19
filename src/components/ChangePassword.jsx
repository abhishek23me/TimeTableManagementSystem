import React, { useState } from "react";

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

const container = {
  maxWidth: '535px',
  padding: '0 20px',
  margin: '40px auto',
};
const row = {
  height: '45px',
  marginBottom: '15px',
  position: 'relative',
};
const iconin1 = {
  marginLeft: "-22px",
  color: "#0d6efd",
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
  marginTop:"23px",
  marginLeft:"23px",
  justifyContent: 'center',
};
const wrapper = {
  width: '100%',
  background: '#fff',
  borderRadius: '5px',
  boxShadow: '0px 4px 10px 1px rgba(0, 0, 0, 1)',
};

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    // Get the userId from local storage
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    // Password validation rules
    const alphabetRegex = /[a-zA-Z]/;
    const digitRegex = /\d/;
    const symbolRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;
  
    if (
      !alphabetRegex.test(newPassword) ||
      !digitRegex.test(newPassword) ||
      !symbolRegex.test(newPassword) ||
      newPassword.length > 15
    ) {
      alert(
        "Password must contain at least one alphabet, one digit, one symbol, and be no more than 15 characters long"
      );
      return;
    }
  
    try {
      const response = await fetch("/api/auth/changepassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        // Clear the password fields after successful change
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Password change failed");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Password change failed");
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={container}>
      <div style={wrapper}>
     <div style={title}><span>Change Password</span></div>
      <form onSubmit={handleChangePassword}>
      
      <div style={row}>
            <i className="fa-solid fa-unlock" style={icons}></i>
        <input
          type={showPassword ? "text" : "password"}
          id="current-password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={styles.input}
        />
        <i style={iconin1}
                    className="fa-solid fa-key"
                    aria-hidden="true"
                    onClick={togglePasswordVisibility}
        ></i>
            
        </div>
        <div style={row}>
            <i className="fa-solid fa-unlock" style={icons}></i>
        
        <input
          type={showPassword ? "text" : "password"}
          id="new-password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
         <i style={iconin1}
                    className="fa-solid fa-key"
                    aria-hidden="true"
                    onClick={togglePasswordVisibility}
        ></i>
        </div>
        <div style={row}>
            <i className="fa-solid fa-unlock" style={icons}></i>
        
        <input
          type={showPassword ? "text" : "password"}
          id="confirm-password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
         <i style={iconin1}
                    className="fa-solid fa-key"
                    aria-hidden="true"
                    onClick={togglePasswordVisibility}
        ></i>
        </div>
        <br />
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
    </div>
  
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "30px",
  },
  
  input: {
    width: "400px",
    marginLeft:"67px",
    padding: "8px",
    marginBottom: "10px",
    height: '100%',
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop:"23px",
    boxSizing: "border-box",
  },
  submitButton: {
    backgroundColor:"#127faa",
    color: "white",
    fontWeight: '700PX',
    padding: "12px 20px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginLeft:"40%",
    marginBottom:"15px",
  },
};

export default ChangePassword;
