import React, { useState } from "react";

const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

const Capcha = () => {
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());

  const handleRefresh = () => {
    setCaptchaCode(generateRandomCode());
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Login</h2>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            id="captcha"
            name="captcha"
            value={captchaCode}
            readOnly
          />
          <button
            type="button"
            onClick={handleRefresh}
            style={{ marginLeft: "10px" }}
          >
            Refresh
          </button>
        </div>
      </form>
    </div>
  );
};

export default Capcha;
