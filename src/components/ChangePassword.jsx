import React, { useState } from "react";

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

  return (
    <div style={styles.container} className="change-password-container">
      <h1 style={styles.heading}>Change Password</h1>
      <form onSubmit={handleChangePassword}>
        <label htmlFor="current-password" style={styles.label}>
          Current Password:
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={styles.input}
        />
        <br />
        <label htmlFor="new-password" style={styles.label}>
          New Password:
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <br />
        <label htmlFor="confirm-password" style={styles.label}>
          Confirm Password:
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <br />
        <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
          Show Password
        </button>
        <br />
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
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
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "300px",
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  showPasswordButton: {
    backgroundColor: "transparent",
    color: "#4CAF50",
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "15px",
  },
};

export default ChangePassword;
