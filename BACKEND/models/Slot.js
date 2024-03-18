const mongoose = require('mongoose');

const { Schema } = mongoose;

const SlotSchema = new Schema({
    slotno: {
        type: Number,
        required: true
    },
    slotname: {
        type: String,
        required: true,
        unique: true
    },
    slotday: {
        type: String,
        required: true,
    },
    slottime: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
});

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;
