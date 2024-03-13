// const express = require('express');
// const router = express.Router();
// const Subject = require('../models/Subject');

// // Route to add credit information
// router.post("/addsubjects", async (req, res) => {
//   console.log("aagya");
//   try {
//     const {
//       category,
//       coursetitle,
//       coursecode,
//       ntr,
//       version,
//       lecture,
//       practical,
//       tutorial,
//       project,
//       credit,
//       coursetype,
//       courseoption
//     } = req.body;

//     const newSubject = new Subject({
//       category,
//       coursetitle,
//       coursecode,
//       ntr,
//       version,
//       lecture,
//       practical,
//       tutorial,
//       project,
//       credit,
//       coursetype,
//       courseoption
//     });

//     const savedSubject = await newSubject.save();
//     res.json({ success: true, message: "Subject added successfully", subject: savedSubject });
//   } catch (error) {
//     console.error("Error adding subject:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Route to add credit information
router.post("/addsubjects", async (req, res) => {
  console.log("aagya");
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
      coursetype,
      courseoption
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
      coursetype,
      courseoption,
      // Default values for slots related fields
      Fslotname: "empty",
      Fslotday: "empty",
      Fslottime: "empty",
      Sslotname: "empty",
      Sslotday: "empty",
      Sslottime: "empty",
      Tslotname: "empty",
      Tslotday: "empty",
      Tslottime:"empty",
    });

    const savedSubject = await newSubject.save();
    res.json({ success: true, message: "Subject added successfully", subject: savedSubject });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/subject/addSlotData/:id
// Update the subject with the given ID with the selected slot data
router.put('/addSlotData/:id', async (req, res) => {
  const { id } = req.params;
  const { Fslotname, Fslotday, Fslottime } = req.body;

  try {
    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    // Update the subject's slot data
    subject.Fslotname = Fslotname || subject.Fslotname;
    subject.Fslotday = Fslotday || subject.Fslotday;
    subject.Fslottime = Fslottime || subject.Fslottime;

    await subject.save();

    res.json({ message: 'Slot data updated successfully', subject });
  } catch (error) {
    console.error('Error updating slot data:', error);
    res.status(500).json({ error: 'Failed to update slot data' });
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

router.put('/updateslots/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSubjectData = req.body;

  try {
    let subject = await Subject.findByIdAndUpdate(id, updatedSubjectData, { new: true });

    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    res.json({ success: true, message: "Subject updated successfully", subject });
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
    coursetype,
    courseoption,
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
    subject.coursetype = coursetype;
    subject.courseoption = courseoption;

    // Save updated subject
    subject = await subject.save();

    res.json({ success: true, message: "Subject updated successfully", subject });
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
      return res.status(404).json({ success: false, message: "Subject not found" });
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
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    // If subject found, return subject data
    res.json({ success: true, subject });
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



module.exports = router;