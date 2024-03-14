const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// Route to create a new slot
router.post('/slots', async (req, res) => {
  const { slotno, slotname, slotday, slottime } = req.body;

  if (!slotno || !slotname || !slotday || !slottime) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newSlot = new Slot({
      slotno,
      slotname,
      slotday,
      slottime,
      available: true, // Assuming the default value for 'available' should be true
    });

    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.slotname === 1) {
      return res.status(400).json({ message: "Slot with this name already exists." });
    }
    res.status(400).json({ message: error.message });
  }
});

// GET all slots that are available
router.get("/allSlots", async (req, res) => {
  try {
    const availableSlots = await Slot.find({ available: true });
    res.json({ slots: availableSlots });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: "Error fetching available slots" });
  }
});

// PUT select slot
router.put('/selectSlot/:selectedSlot', async (req, res) => {
  const { selectedSlot } = req.params;

  try {
    await Slot.findOneAndUpdate(
      { slotname: selectedSlot },
      { available: false }
    );
    res.status(200).json({ message: 'Slot selected successfully' });
  } catch (error) {
    console.error('Error selecting slot:', error);
    res.status(500).json({ error: 'Error selecting slot' });
  }
});

// PUT request to update slots availability
router.put('/updateAvailability', async (req, res) => {
  try {
    const updatedSlots = req.body.slots; // Array of updated slot data

    // Validate that updatedSlots is an array
    if (!Array.isArray(updatedSlots)) {
      return res.status(400).json({ message: "Invalid data format. Expected an array." });
    }

    // Update availability for each slot
    const updatedPromises = updatedSlots.map(async (slot) => {
      const updatedSlot = await Slot.findByIdAndUpdate(
        slot._id,
        { available: false }, // Change to false
        { new: true }
      );
      return updatedSlot;
    });

    // Wait for all updates to finish
    const updatedResults = await Promise.all(updatedPromises);

    // Check if any updates failed
    const failedUpdates = updatedResults.filter((result) => !result);
    if (failedUpdates.length > 0) {
      return res.status(404).json({ message: "Some slots could not be updated" });
    }

    res.status(200).json({ message: 'Slots availability updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all available slots
router.get('/allAvailableSlots', async (req, res) => {
  try {
    const slots = await Slot.find({ available: true });

    if (!slots || slots.length === 0) {
      return res.status(404).json({ message: 'No available slots found' });
    }

    res.json({ slots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ message: 'Failed to fetch available slots' });
  }
});

// PUT request to update all slots availability to false
router.put('/updateAllSlotsAvailability', async (req, res) => {
  try {
    // Update all slots to set available to false
    await Slot.updateMany({}, { available: false });

    res.status(200).json({ message: 'All slots availability updated to false' });
  } catch (error) {
    console.error('Error updating all slots availability:', error);
    res.status(500).json({ error: 'Failed to update all slots availability' });
  }
});

module.exports = router;
