const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// Route to create a new slot
router.post('/slots', async (req, res) => {
  const { slotno, slotname,slotday, slottime, slotselection } = req.body;

  if (!slotno || !slotname  || !slotday || !slottime  || !slotselection) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newSlot = new Slot({
      slotno,
      slotname,
      slotday,
      slottime,
      slotselection,
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

// GET all slots
router.get('/allSlots', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json({ slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Error fetching slots' });
  }
});

// PUT select slot
router.put('/selectSlot/:selectedSlot', async (req, res) => {
  const { selectedSlot } = req.params;

  try {
    await Slot.findOneAndUpdate(
      { slotname: selectedSlot },
      { slotselection: 'YES' }
    );
    res.status(200).json({ message: 'Slot selected successfully' });
  } catch (error) {
    console.error('Error selecting slot:', error);
    res.status(500).json({ error: 'Error selecting slot' });
  }
});


module.exports = router;
