const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubjectSchema = new Schema({
  category: {
    type: String,
    required: true,
    default: "General"
  },
  coursetitle: {
    type: String,
    required: true,
    default: "General"
  },
  coursecode: {
    type: String,
    required: true,
    default: "General"
  },
  ntr: {
    type: String,
    required: true,
    default: "General"
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
  courseoption: {
    type: String,
    required: true,
    default: "General"
  },
  Fslotname: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Fslotday: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Fslottime: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Sslotname: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Sslotday: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Sslottime: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Tslotname: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Tslotday: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  Tslottime: {
    type: String,
    required: false,
    default: "empty"  // Set default value to empty
  },
  available: {
    type: Boolean,
    default: true
  }
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;