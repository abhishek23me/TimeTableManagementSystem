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
    slotselection: {
        type: String,
        required: true
    },
});

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;
