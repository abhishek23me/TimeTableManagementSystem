const mongoose = require('mongoose');
const { Schema } = mongoose;

// Function to convert UTC date to IST
const convertUTCtoIST = (utcDate) => {
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5.5 hours)
  const istDate = new Date(utcDate.getTime() + istOffset);
  return istDate;
};

const SubjectSchema = new Schema({
  category: {
    type: String,
    required: true,
    default: "General"
  },
  coursetitle: {
    type: String,
    required: true,
    unique: true
  },
  coursecode: {
    type: String,
    required: true,
    unique: true
  },
  ntr: {
    type: String,
    required: true,
    unique: true
  },
  version: {
    type: String,
    required: true,
    default: "General"
  },
  lecture: {
    type: String,
    required: true,
    default: "General"
  },
  practical: {
    type: String,
    required: true,
    default: "General"
  },
  tutorial: {
    type: String,
    required: true,
    default: "General"
  },
  project: {
    type: String,
    required: true,
    default: "General"
  },
  credit: {
    type: String,
    required: true,
    default: "General"
  },
  coursetype: {
    type: String,
    required: true,
    default: "General"
  },
  coursesemester: {
    type: String,
    required: true,
    default: "General"
  },
  courseoption: {
    type: String,
    required: true,
    default: "General"
  },
  coursevenue: {
    type: String,
    required: true,
    default: "General"
  },
  
  Fslotname: {
    type: String,
    required: false,
    default: "empty"
  },
  Fslotday: {
    type: String,
    required: false,
    default: "empty"
  },
  Fslottime: {
    type: String,
    required: false,
    default: "empty"
  },
  // other fields...
  FslotId: {
    type: String,
    default: null
  },
  SslotId: {
    type: String,
    default: null
  },
  TslotId: {
    type: String,
    default: null
  },
  available: {
    type: Boolean,
    default: true
  },
  // Separate fields for storing date and time
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    default: "00:00"
  },
});



// Custom validation function to check uniqueness of 'coursecode'
SubjectSchema.path('coursecode').validate(async function (value) {
  const count = await mongoose.models.Subject.countDocuments({ coursecode: value });
  return !count; // Returns true if count is 0 (indicating unique), false otherwise
}, 'Course code must be unique.');

// Custom validation function to check uniqueness of 'coursetitle'
SubjectSchema.path('coursetitle').validate(async function (value) {
  const count = await mongoose.models.Subject.countDocuments({ coursetitle: value });
  return !count; // Returns true if count is 0 (indicating unique), false otherwise
}, 'Course title must be unique.');

// Middleware functions to check uniqueness of 'coursecode' and 'coursetitle' before saving
SubjectSchema.pre('save', async function (next) {
  if (!this.isModified('coursecode')) {
    return next();
  }
  const count = await mongoose.models.Subject.countDocuments({ coursecode: this.coursecode });
  if (count !== 0) {
    throw new Error('Course code must be unique.');
  }
  next();
});



// Middleware function to convert date to IST before saving
SubjectSchema.pre('save', function(next) {
  // Convert the date to IST
  this.date = convertUTCtoIST(this.date);

  // Set the time format to IST (if you have a specific time)
  // Modify the format according to your requirement
  const hours = this.date.getHours();
  const minutes = this.date.getMinutes();
  const ISTtime = `${hours}:${minutes}`;
  this.time = ISTtime;

  next();
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;