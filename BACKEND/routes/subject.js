const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const User = require("../models/User");

// Route to fetch subject data by ID
router.get('/fetchsubject/:subjectId', async (req, res) => {
  try {
    const subjectId = req.params.subjectId;

    // Query the database to find the subject by its ID
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }

    // If subject is found, send it in the response
    res.status(200).json({ success: true, subject });
  } catch (error) {
    console.error('Error fetching subject:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to add credit information
router.post("/addsubjects", async (req, res) => {
  try {
    const {
      category,
      coursetitle,
      coursecode,
      ntr,
      version,
      lecture,
      practical,
      tutorial,
      project,
      credit,
      coursevenue,
      coursetype,
      courseoption,
    } = req.body;

    const newSubject = new Subject({
      category,
      coursetitle,
      coursecode,
      ntr,
      version,
      lecture,
      practical,
      tutorial,
      project,
      credit,
      coursevenue,
      coursetype,
      courseoption,
      // Default values for slots related fields
      FslotId: null,
      Fslotname: "empty",
      Fslotday: "empty",
      Fslottime: "empty",
      SslotId: null,
      Sslotname: "empty",
      Sslotday: "empty",
      Sslottime: "empty",
      TslotId: null,
      Tslotname: "empty",
      Tslotday: "empty",
      Tslottime: "empty",
      available: true,
    });

    const savedSubject = await newSubject.save();
    res.json({
      success: true,
      message: "Subject added successfully",
      subject: savedSubject,
    });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/subject/addSlotData/:id
// Update the subject with the given ID with the selected slot data
router.put("/addSlotData/:id", async (req, res) => {
  const { id } = req.params;
  const { slotId, slotname, slotday, slottime } = req.body;

  try {
    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    // Update the subject's slot data
    if (slotId === "FslotId") {
      subject.FslotId = slotId || subject.FslotId;
      subject.Fslotname = slotname || subject.Fslotname;
      subject.Fslotday = slotday || subject.Fslotday;
      subject.Fslottime = slottime || subject.Fslottime;
    } else if (slotId === "SslotId") {
      subject.SslotId = slotId || subject.SslotId;
      subject.Sslotname = slotname || subject.Sslotname;
      subject.Sslotday = slotday || subject.Sslotday;
      subject.Sslottime = slottime || subject.Sslottime;
    } else if (slotId === "TslotId") {
      subject.TslotId = slotId || subject.TslotId;
      subject.Tslotname = slotname || subject.Tslotname;
      subject.Tslotday = slotday || subject.Tslotday;
      subject.Tslottime = slottime || subject.Tslottime;
    }

    await subject.save();

    res.json({ message: "Slot data updated successfully", subject });
  } catch (error) {
    console.error("Error updating slot data:", error);
    res.status(500).json({ error: "Failed to update slot data" });
  }
});

// Route to get all subjects
router.get("/allSubjects", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json({ success: true, subjects });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateslots/:id", async (req, res) => {
  const { id } = req.params;
  const updatedSubjectData = req.body;

  try {
    let subject = await Subject.findByIdAndUpdate(id, updatedSubjectData, {
      new: true,
    });

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    res.json({
      success: true,
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to update a subject
router.put("/updatesubject/:id", async (req, res) => {
  const { id } = req.params;
  const {
    category,
    coursetitle,
    coursecode,
    ntr,
    version,
    lecture,
    practical,
    tutorial,
    project,
    credit,
    coursevenue,
    coursetype,
    courseoption,
    FslotId,
    Fslotname,
    Fslotday,
    Fslottime,
    SslotId,
    Sslotname,
    Sslotday,
    Sslottime,
    TslotId,
    Tslotname,
    Tslotday,
    Tslottime,
  } = req.body;

  try {
    let subject = await Subject.findById(id);

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    // Update subject fields
    subject.category = category;
    subject.coursetitle = coursetitle;
    subject.coursecode = coursecode;
    subject.ntr = ntr;
    subject.version = version;
    subject.lecture = lecture;
    subject.practical = practical;
    subject.tutorial = tutorial;
    subject.project = project;
    subject.credit = credit;
    subject.coursevenue = coursevenue;
    subject.coursetype = coursetype;
    subject.courseoption = courseoption;
    subject.FslotId = FslotId || subject.FslotId;
    subject.Fslotname = Fslotname || subject.Fslotname;
    subject.Fslotday = Fslotday || subject.Fslotday;
    subject.Fslottime = Fslottime || subject.Fslottime;
    subject.SslotId = SslotId || subject.SslotId;
    subject.Sslotname = Sslotname || subject.Sslotname;
    subject.Sslotday = Sslotday || subject.Sslotday;
    subject.Sslottime = Sslottime || subject.Sslottime;
    subject.TslotId = TslotId || subject.TslotId;
    subject.Tslotname = Tslotname || subject.Tslotname;
    subject.Tslotday = Tslotday || subject.Tslotday;
    subject.Tslottime = Tslottime || subject.Tslottime;

    // Save updated subject
    subject = await subject.save();

    res.json({
      success: true,
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to delete a subject by ID
router.delete("/subjectstodelete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    // If subject found and deleted successfully
    res.json({ success: true, message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get subject by ID
router.get("/subjects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    // If subject found, return subject data
    res.json({ success: true, subject });
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all available subjects
router.get("/allAvailableSubjects", async (req, res) => {
  try {
    // Find all subjects where available is true
    const subjects = await Subject.find({ available: true });
    res.json({ subjects });
  } catch (error) {
    console.error("Error fetching available subjects:", error);
    res.status(500).json({ message: "Failed to fetch available subjects" });
  }
});

// Route to update subject availability
router.put("/updateAvailability/:subjectId", async (req, res) => {
  try {
    const { subjectId } = req.params;
    const updatedSubject = req.body;

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    subject.available = updatedSubject.available;

    const savedSubject = await subject.save();

    res.json({
      success: true,
      message: "Subject availability updated successfully",
      subject: savedSubject,
    });
  } catch (error) {
    console.error("Error updating subject availability:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/subject/updateSelectedSlotsAvailability
// Update the availability of selected slots
router.put("/updateSelectedSlotsAvailability", async (req, res) => {
  const { slotIds } = req.body;

  try {
    await Subject.updateMany({ _id: { $in: slotIds } }, { available: false });

    res.json({
      success: true,
      message: "Slots availability updated successfully",
    });
  } catch (error) {
    console.error("Error updating selected slots availability:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update selected slots availability",
      });
  }
});

// Sample endpoint to fetch subject data by ID
router.get("/:id", async (req, res) => {
  const subjectId = req.params.id;

  try {
    // Fetch subject data from the database based on subjectId
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    // Return the subject data
    res.status(200).json({ success: true, subject });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;