import React from "react";

const body = {
  border: "3px solid grey",
  width: "90%",
  margin: "35px",
  borderRadius: "5px ",
  boxShadow: "1px 1px 3px 3px rgb(0 0 0/15%)",
  padding: "0px",
  backgroundColor: "white",
};

const body1 = {
  border: "3px solid blue",
  width: "90%",
  margin: "35px",
  borderRadius: "5px ",
  textAlign: "center",
  boxShadow: "1px 1px 3px 3px rgb(0 0 0/15%)",
  padding: "0px",
  height: "350px",
  fontSize: "20px",
  backgroundColor: "#ffffcc",
};
const thead = {
  fontSize: "23px",
  fontWight: "10px",

  borderLeft: "1px solid grey",
  color: "white",
  padding: "2px",
  margin: "0px",
};
const thro1 = {
  backgroundColor: "rgb(49 98 176)",
};
const thro2 = {
  fontSize: "23px",
};
const tabletd = {
  backgroundColor: "white",
  borderLeft: "1px solid grey",
  paddingLeft: "5px",
};
const list = {
  listStyleType: "none",
  textAlign: "left",
  margin: "0",
  padding: "2px",
};

const tdgrey = {
  backgroundColor: "#e2e2e2",
  borderRight: "1px solid blue",
  borderBottom: "1px solid blue",
};
const tr1 = {
  backgroundColor: "#ccccff",
};

const tr2 = {
  borderRight: "1px solid blue",
  borderBottom: "1px solid blue",
};

function TimeTable() {
  return (
    <>
      <table style={body}>
        <tr style={thro1}>
          <th style={thead}>SI.No</th>
          <th style={thead}>Class Group</th>
          <th style={thead}>Course</th>
          <th style={thead}>
            <ul style={list}>
              <li>L T</li>
              <li>P J</li>
              <li>C</li>
            </ul>
          </th>
          <th style={thead}>Category</th>
          <th style={thead}>Course Option</th>
          <th style={thead}>Class NTR</th>
          <th style={thead}>Slot-Venue</th>
        </tr>

        <tr style={thro2}>
          <td style={tabletd}>1</td>
          <td style={tabletd}>2</td>
          <td style={tabletd}>3</td>
          <td style={tabletd}>
            <ul style={list}>
              <li>2 4</li>
              <li>4 2</li>
              <li>1</li>
            </ul>
          </td>
          <td style={tabletd}>5</td>
          <td style={tabletd}>6</td>
          <td style={tabletd}>7</td>
          <td style={tabletd}>8</td>
        </tr>
      </table>

      <table style={body1}>
        <tr style={tr1}>
          <td rowspan="2" style={tdgrey}>
            {" "}
            THEORY{" "}
          </td>
          <td style={tdgrey}>Start</td>
          <td style={tr2}>8:30</td>
          <td style={tr2}>10:05</td>
          <td style={tr2}>11:40</td>
          <td style={tr2}>Lunch</td>
          <td style={tr2}>13:15</td>
          <td style={tr2}>14:50</td>
          <td style={tr2}>16:25</td>
          <td style={tr2}> 18:00</td>
        </tr>

        <tr style={tr1}>
          <td style={tdgrey}>End</td>
          <td style={tr2}>8:30</td>
          <td style={tr2}>10:00</td>
          <td style={tr2}>11:35</td>
          <td style={tr2}>Lunch</td>
          <td style={tr2}>14:45</td>
          <td style={tr2}>16:20</td>
          <td style={tr2}>17:55</td>
          <td style={tr2}>19:30</td>
        </tr>

        <tr>
          <td style={tdgrey}> MON </td>
          <td style={tdgrey}>THEORY</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tdgrey}>Lunch</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
        </tr>

        <tr>
          <td style={tdgrey}> TUE </td>
          <td style={tdgrey}>THEORY</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tdgrey}>Lunch</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
        </tr>

        <tr>
          <td style={tdgrey}> WED</td>
          <td style={tdgrey}>THEORY</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tdgrey}>Lunch</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
        </tr>

        <tr>
          <td style={tdgrey}> THU</td>
          <td style={tdgrey}>THEORY</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tdgrey}>Lunch</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
        </tr>

        <tr>
          <td style={tdgrey}> FRI</td>
          <td style={tdgrey}>THEORY</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tdgrey}>Lunch</td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
          <td style={tr2}></td>
        </tr>
      </table>
    </>
  );
}

export default TimeTable;
