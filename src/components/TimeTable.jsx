import React from "react";

const body1 = {
  border: "3px solid blue",
  width: "90%",
  margin: "35px",
  borderRadius: "5px",
  textAlign: "center",
  boxShadow: "1px 1px 3px 3px rgb(0 0 0/15%)",
  padding: "0px",
  height: "300px", // Decreased height
  fontSize: "20px",
  backgroundColor: "#ffffcc",
};
const tdgrey = {
  border: "1px solid #000", // Added border for all cells
  padding: "5px",
};
const tr1 = {
  backgroundColor: "#ccccff",
};
const tr2 = {
  borderRight: "1px solid #000",
  borderBottom: "1px solid #000",
};

// Mock data for demonstration
const slotsData = [
  { slotday: "Monday", slottime: "8:30 to 10:00", slotname: "Slot 1" },
  { slotday: "Monday", slottime: "10:05 to 11:35", slotname: "Slot 2" },
  { slotday: "Monday", slottime: "11:40 to 13:10", slotname: "Slot 3" },
  { slotday: "Tuesday", slottime: "8:30 to 10:00", slotname: "Slot 1" },
  { slotday: "Tuesday", slottime: "10:05 to 11:35", slotname: "Slot 2" },
  { slotday: "Wednesday", slottime: "14:50 to 16:20", slotname: "Slot 5" },
  { slotday: "Thursday", slottime: "18:00 to 19:30", slotname: "Slot 7" },
  { slotday: "Friday", slottime: "18:00 to 19:30", slotname: "Slot 4" },
];

// Function to render the slots for a day
const renderDaySlots = (daySlots) => {
  return Array.from({ length: 7 }, (_, index) => {
    const slot = daySlots.find((slot) => parseInt(slot.slotname.split(" ")[1]) === index + 1);
    return (
      <td key={index} style={tdgrey}>
        {slot ? `Slot ${slot.slotname.split(" ")[1]}` : ""}
      </td>
    );
  });
};

function TimeTable() {
  return (
    <>
      <table style={body1}>
        <thead>
          <tr style={tr1}>
            <td rowSpan="2" style={tdgrey}>
              THEORY
            </td>
            <td style={tdgrey}>Start</td>
            <td style={tdgrey}>8:30</td>
            <td style={tdgrey}>10:05</td>
            <td style={tdgrey}>11:40</td>
            <td style={tdgrey}>13:15</td>
            <td style={tdgrey}>14:50</td>
            <td style={tdgrey}>16:25</td>
            <td style={tdgrey}>18:00</td>
          </tr>
          <tr style={tr1}>
            <td style={tdgrey}>End</td>
            <td style={tdgrey}>10:00</td>
            <td style={tdgrey}>11:35</td>
            <td style={tdgrey}>13:10</td>
            <td style={tdgrey}>14:45</td>
            <td style={tdgrey}>16:20</td>
            <td style={tdgrey}>17:55</td>
            <td style={tdgrey}>19:30</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdgrey}>MON</td>
            <td style={tdgrey}>THEORY</td>
            {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Monday"))}
          </tr>
          <tr>
            <td style={tdgrey}>TUE</td>
            <td style={tdgrey}>THEORY</td>
            {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Tuesday"))}
          </tr>
          <tr>
            <td style={tdgrey}>WED</td>
            <td style={tdgrey}>THEORY</td>
            {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Wednesday"))}
          </tr>
          <tr>
            <td style={tdgrey}>THU</td>
            <td style={tdgrey}>THEORY</td>
            {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Thursday"))}
          </tr>
          <tr>
            <td style={tdgrey}>FRI</td>
            <td style={tdgrey}>THEORY</td>
            {renderDaySlots(slotsData.filter((slot) => slot.slotday === "Friday"))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TimeTable;
