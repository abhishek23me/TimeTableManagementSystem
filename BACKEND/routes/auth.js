const express = require("express");
const User = require("../models/User");
const Subject = require("../models/Subject.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser.js');
const mongoose = require('mongoose');


const JWT_SECRET = "abhiisagoodb$oy";

router.get('/fetchtimetable/:userId', async (req, res) => {
  const { userId } = req.params;

  // Check if userId is in the correct ObjectId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid userId format' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route 1: create a user using: POST "/api/auth/createuser". No Login Required
router.post(
  "/createuser",
  [
    body("register", "Enter a valid username"),
    body("name", "Enter a valid name"),
    body("email", "Enter a valid email").isEmail(),
    body("facultyName", "Enter faculty name"),
    body("designation", "Enter designation"),
    body("departmentName", "Enter department name"),
    body("schoolCenterName", "Enter school/center name"),
    body("cabinNo", "Enter cabin number"),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        facultyName: req.body.facultyName,
        designation: req.body.designation,
        departmentName: req.body.departmentName,
        schoolCenterName: req.body.schoolCenterName,
        cabinNo: req.body.cabinNo,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2: authenticate a user using: POST "/api/auth/login". No Login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: get all users using: GET "/api/auth/all". No Login Required
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE endpoint to delete a user by ID
router.delete('/userstodelete/:id', async (req, res) => {
  try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Server error' });
  }
});

// Update user endpoint
router.put('/updateuser/:id', async (req, res) => {
  const id = req.params.id;
  const { username, name, email, facultyName, designation, departmentName, schoolCenterName, cabinNo, password } = req.body;
  
  try {
      const updatedUser = await User.findByIdAndUpdate(
          id,
          {
              username,
              name,
              email,
              facultyName,
              designation,
              departmentName,
              schoolCenterName,
              cabinNo,
              password, // You may want to hash this password before saving to DB
          },
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to change password for a user using: PUT "/api/auth/changepassword"
router.put("/changepassword", async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT endpoint to update user's selected subjects
router.put('/:userId/subjects', async (req, res) => {
  const { userId } = req.params;
  const { subject1, subject2, subject3 } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the user's selected subjects
    user.subject1 = subject1 || user.subject1;
    user.subject2 = subject2 || user.subject2;
    user.subject3 = subject3 || user.subject3;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user subjects:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to get user by email
router.get("/user", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If user found, return user data
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get user by ID
router.get("/userbyid/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If user found, return user data
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});





// Endpoint to check if a username exists
router.get('/checkusername/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Check if the username exists in the database
    const user = await User.findOne({ username });

    // Respond with JSON indicating whether the username exists
    res.json({ exists: !!user }); // If user is found, exists will be true, otherwise false
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Route to get user profile by ID
router.get("/userprofile", async (req, res) => {
  const userId = req.query.id;
  console.log("Received request to fetch user profile with ID:", userId);

  try {
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      console.log("User profile not found with ID:", userId);
      return res.status(404).json({ success: false, message: "User profile not found" });
    }
    console.log("Found user profile:", userProfile);
    res.json({ success: true, userProfile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to update user profile by ID
router.put("/updateuser", async (req, res) => {
  const userId = req.query.id;
  console.log("Received request to update user profile with ID:", userId);

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      console.log("User profile not found with ID:", userId);
      return res.status(404).json({ success: false, message: "User profile not found" });
    }

    console.log("Updated user profile:", updatedUser);
    res.json({ success: true, updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get timetable data for the user
router.get("/fetchh/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Extract subject IDs from user schema
    const { subject1, subject2, subject3 } = user;

    // Fetch subject details based on subject IDs
    const subjectPromises = [Subject.findById(subject1), Subject.findById(subject2), Subject.findById(subject3)];

    // Execute all promises in parallel
    const subjects = await Promise.all(subjectPromises);

    const timetableData = {
      success: true,
      timetableData: subjects.map(subject => {
        if (!subject) {
          return null; // Return null for subjects that are not found
        }

        return {
          category: subject.category || "N/A",
          coursetitle: subject.coursetitle || "N/A",
          coursecode: subject.coursecode || "N/A",
          ntr: subject.ntr || "N/A",
          version: subject.version || "N/A",
          lecture: subject.lecture || "N/A",
          practical: subject.practical || "N/A",
          tutorial: subject.tutorial || "N/A",
          project: subject.project || "N/A",
          credit: subject.credit || "N/A",
          coursevenue: subject.coursevenue || "N/A",
          coursetype: subject.coursetype || "N/A",
          courseoption: subject.courseoption || "N/A",
          Fslotname: subject.Fslotname || "N/A",
          Fslotday: subject.Fslotday || "N/A",
          Fslottime: subject.Fslottime || "N/A",
          Sslotname: subject.Sslotname || "N/A",
          Sslotday: subject.Sslotday || "N/A",
          Sslottime: subject.Sslottime || "N/A",
          Tslotname: subject.Tslotname || "N/A",
          Tslotday: subject.Tslotday || "N/A",
          Tslottime: subject.Tslottime || "N/A",
        };
      }),
    };

    res.json(timetableData);
  } catch (error) {
    console.error("Error fetching timetable data for user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Endpoint to check if an email exists
router.get('/checkemail/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    // Respond with JSON indicating whether the email exists
    res.json({ exists: !!user }); // If user is found, exists will be true, otherwise false
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Endpoint to check if a cabin number exists
router.get('/checkcabin/:cabinNo', async (req, res) => {
  const { cabinNo } = req.params;

  try {
    // Check if the cabin number exists in the database
    const user = await User.findOne({ cabinNo });

    // Respond with JSON indicating whether the cabin number exists
    res.json({ exists: !!user }); // If user is found, exists will be true, otherwise false
  } catch (error) {
    console.error("Error checking cabin number:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to check if a username exists
router.get('/checkusername/:username', (req, res) => {
  const { username } = req.params;

  // Check if the username exists in the database
  const userExists = users.some(user => user.username === username);

  // Respond with JSON indicating whether the username exists
  res.json({ exists: userExists });
});

module.exports = router;