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
  // other fields...
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
    type: Schema.Types.ObjectId,
    default: null
  },
  SslotId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  TslotId: {
    type: Schema.Types.ObjectId,
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
