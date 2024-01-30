import React from "react";
import employee from "../employee.png";
import adminimg from "../admin1.png";
import { useNavigate} from 'react-router-dom';

const Home = () => {
  const history = useNavigate();
  const handleNavigateToLogin = () => {
    history('/login');
  };

  const first = {
    color: "rgb(23,108,184)",
    display: "flex",
    fontSize: "31px",
    justifyContent: "center",
    fontWeight: "500",
  };

  const border = {
    marginTop: "10px",
    height: "625px",
  };

  const second = {
    fontWeight: "500",
    marginTop: "9px",
    display: "flex",
    justifyContent: "center",
  };

  const box = {
    width: "50%",
    height: "100px",
    // border: "1px solid black",
    margin: "auto",
    display: "flex",
    marginTop: "30px",
  };

  const employeeimg = {
    height: "63px",
    width: "65px",
    padding: "10px",
    marginLeft: "32px",
  };

  const employeeimg1 = {
    height: "70px",
    width: "70px",
    padding: "10px",
    marginLeft: "32px",
  };

  const employeeText = {
    // border: "1px solid red",
    height: "70px",
    width: "150px",
    margin: "auto",
  };

  const box1 = {
    height: "86px",
    width: "332px",
    borderTop: "3px solid red",
    borderRadius: "5px",
    display: "flex",
    margin: "auto",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0 / 15%)",
  };

  const box2 = {
    height: "86px",
    width: "332px",
    borderTop: "3px solid green",
    borderRadius: "5px",
    display: "flex",
    margin: "auto",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0 / 15%)",
  };

  const txt1 = {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
    fontSize: "18px",
    fontWeight: "500",
    color: "red",
  };

  const txt2 = {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
    fontSize: "18px",
    fontWeight: "500",
    color: "Green",
  };
  const btn1 = {
    display: "flex",
    justifyContent: "center",
    // border: "1px solid red",
    width: "35px",
    height: "30px",
    margin: "auto",
    color: "rgb(212, 172, 13)",
    borderRadius: "6px",
    marginTop: "2px",
    backgroundColor: "red",
  };

  const btn2 = {
    display: "flex",
    justifyContent: "center",
    // border: "1px solid red",
    width: "35px",
    height: "30px",
    margin: "auto",
    color: "rgb(212, 172, 13)",
    borderRadius: "6px",
    marginTop: "2px",
    backgroundColor: "#58b058",
  };

  const icon1 = {
    marginTop: "5px",
    fontSize: "20px",
    color: "white",
  };

  const icon2 = {
    marginTop: "5px",
    fontSize: "20px",
    color: "white",
  };

  return (
    <div style={border}>
      <div>
        <strong style={first}>VTOP translates to "VIT" on "TOP"</strong>
        <div style={second}>
          A digital initiative by the institute facilitating FFCS Timetable
          Registration to the Faculties at this platform.
        </div>
      </div>
      <div style={box}>
        <div style={box1}>
          <img style={employeeimg} src={employee} alt="" />
          <div style={employeeText}>
            <div style={txt1}>Employee</div>
            <div style={btn1} onClick={handleNavigateToLogin}>
              <i
                style={icon1}
                className="fa fa-sign-in fa-3"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
        <div style={box2}>
          <img style={employeeimg1} src={adminimg} alt="" />
          <div style={employeeText}>
            <div style={txt2}>Admin</div>
            <div style={btn2} onClick={handleNavigateToLogin}>
              <i
                style={icon2}
                className="fa fa-sign-in fa-3"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
