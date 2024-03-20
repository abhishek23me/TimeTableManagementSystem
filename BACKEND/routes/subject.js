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
      coursesemester,
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
      coursesemester,
      // Default values for slots related fields
      FslotId: null,
      SslotId: null,
      TslotId: null,
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
    } else if (slotId === "SslotId") {
      subject.SslotId = slotId || subject.SslotId;
    } else if (slotId === "TslotId") {
      subject.TslotId = slotId || subject.TslotId;
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
    coursesemester,
    FslotId,
    SslotId,
    TslotId,
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
    subject.coursesemester = coursesemester;
    subject.courseoption = courseoption;
    subject.FslotId = FslotId || subject.FslotId;
    subject.SslotId = SslotId || subject.SslotId;
    subject.TslotId = TslotId || subject.TslotId;

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

router.get("/subjectss/:id", async (req, res) => {
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


router.get('/checkcoursecode/:coursecode', async (req, res) => {
  const { coursecode } = req.params;

  try {
    // Check if the course code exists in the database
    const subject = await Subject.findOne({ coursecode });

    // Respond with JSON indicating whether the course code exists
    res.json({ exists: !!subject }); // If subject is found, exists will be true, otherwise false
  } catch (error) {
    console.error("Error checking course code:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  //mca10055  payu1@gmail.com

// Endpoint to check if an NTR exists
router.get('/checkntr/:ntr', async (req, res) => {
  const { ntr } = req.params;

  try {
    // Check if the NTR exists in the database
    const subject = await Subject.findOne({ ntr });

    // Respond with JSON indicating whether the NTR exists
    res.json({ exists: !!subject }); // If subject is found, exists will be true, otherwise false
  } catch (error) {
    console.error("Error checking NTR:", error);
    res.status(500).json({ error: 'Internal Server Error' });
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

router.put("/updateAvailability/:subjectId", async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    // Always set available to false
    subject.available = false;

    // Save the updated subject
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


// GET subject data by ID
router.get('/data/:subjectId', async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json(subject);
  } catch (error) {
    console.error('Error fetching subject data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET subject data by subjectId
router.get("/data/:subjectId", async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;