import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

const Login = () => {
  const history = useNavigate();
  const handleNavigateToHome = () => {
    history("/main");
  };

  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());

  const handleRefresh = () => {
    setCaptchaCode(generateRandomCode());
  };

  const fot = () => {
    var a = document.getElementById('user');
    var b = a.value.toUpperCase();
    a.value = b;
  }

  const loginBox = {
    height: "387px",
    width: "524px",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0 / 15%)",
    borderTop: "3px solid #5cacda",
    borderRadius: "6px",
    margin: "auto",
    marginTop: "46px",
  };

  const text1 = {
    fontWeight: "500",
    fontSize: "22px",
    height: "48px",
    marginLeft: "0px",
    backgroundColor: "#80808017",
  };

  const txt1 = {
    marginTop: "10px",
    marginLeft: "11px",
  };

  const username = {
    display: "flex",
  };

  const icon1 = {
    height: "23.5px",
    width: "21px",
    border: "1px solid #b1b1b1",
  };

  const icon2 = {
    height: "23.5px",
    width: "21px",
    border: "1px solid #b1b1b1",
    marginTop: "15px",
  };

  const icon3 = {
    height: "45px",
    width: "25px",
    border: "1px solid #b1b1b1",
    marginTop: "14.8px",
    backgroundColor: "green",
  };

  const iconin1 = {
    marginLeft: "5px",
    color: "#0d6efd",
  };

  const iconin2 = {
    marginLeft: "3px",
    color: "red",
  };

  const iconin3 = {
    marginLeft: "6px",
    marginTop: "18px",
    color: "black",
    fontSize: "15px",
  };

  const form = {
    marginTop: "30px",
    marginLeft: "33px",
  };

  const common1 = {
    width: "414px",
    height: "20px",
    paddingLeft: "5px",
    fontSize: "12px",
    border: "1px solid #b1b1b1",
    gap: "30px",
  };

  const common2 = {
    width: "414px",
    height: "20px",
    paddingLeft: "5px",
    fontSize: "12px",
    border: "1px solid #b1b1b1",
    marginTop: "15px",
  };
  const common3 = {
    width: "233px",
    height: "45px",
    paddingLeft: "7px",
    border: "1px solid #b1b1b1",
    margin: "auto",
    marginTop: "15px",
    fontSize: "38px",
    color: "red",
  };

  const common4 = {
    width: "437px",
    height: "20px",
    border: "1px solid #b1b1b1",
    paddingLeft: "5px",
    fontSize: "12px",
    marginTop: "15px",
  };

  const maa = {
    display: "flex",
    margin: "auto",
    width: "316px",
  };

  const button = {
    backgroundColor: "#0d6efd",
    borderRadius: "3px",
    marginLeft: "78.6%",
    border: "none",
    marginTop: "14px",
    height: "28px",
    width: "62px",
    color: "white",
    cursor: "pointer",
  };

  const main = {
    height: "602px",
  };

  const forgot = {
    height: "66px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    backgroundColor: "#f4f4f4",
    marginTop: "30px",
  };

  const firstForgot = {
    marginTop: "5px",
    marginLeft: "15px",
    color: "blue",
  };

  const secondForgot = {
    marginLeft: "15px",
    marginTop: "2px",
    color: "blue",
  };

  const thirdForgot = {
    marginLeft: "79%",
    marginTop: "2px",
    color: "#198754",
  };

  return (
    <>
      <Navbar />
      <div style={main}>
        <div style={loginBox}>
          <div style={text1}>
            <span style={txt1}>Login</span>
          </div>
          <div>
            <form style={form}>
              <div style={username}>
                <input
                  placeholder="Username"
                  style={common1}
                  type="text"
                  id="username"
                  name="username"
                  // value={username}
                  // onChange={handleUsernameChange}
                  required
                />
                <div style={icon1}>
                  <i
                    style={iconin1}
                    className="fa fa-user text-primary"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div style={username}>
                <input
                  placeholder="Password"
                  style={common2}
                  type="password"
                  id="password"
                  name="password"
                  // value={password}
                  // onChange={handlePasswordChange}
                  required
                />
                <div style={icon2}>
                  <i
                    style={iconin2}
                    className="fa fa-eye text-danger fw-bold"
                    id="passwordIcon"
                    // onclick="javascript:toggleEye();"
                    aria-hidden="false"
                  ></i>
                </div>
              </div>
              <div style={maa}>
                <div style={username}>
                  <input
                    style={common3}
                    type="text"
                    id="captcha"
                    name="captcha"
                    value={captchaCode}
                    readOnly
                  />
                  <div style={icon3}>
                    <i
                      style={iconin3}
                      onClick={handleRefresh}
                      className="fa fa-refresh"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
              <div style={username}>
                <input
                  placeholder="Enter CAPTCHA Shown Above"
                  style={common4}
                  type="text"
                  id="user"
                  name="username"
                  onInput={fot}
                  // value={username}
                  // onChange={handleUsernameChange}
                  required
                />
              </div>
              <button style={button} onClick={handleNavigateToHome}>
                Submit
              </button>
            </form>
          </div>
          <div style={forgot}>
            <a style={firstForgot} href="">
              Forgot Password
            </a>
            <a style={secondForgot} href="">
              Forgot LoginId
            </a>
            <a style={thirdForgot} href="/">
              Go to Home Page
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
