const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to create a new user
router.post('/createuser', async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      facultyName,
      designation,
      departmentName,
      schoolCenterName,
      cabinNo,
      password,
      confirmPassword
    } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      name,
      email,
      facultyName,
      designation,
      departmentName,
      schoolCenterName,
      cabinNo,
      password
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
