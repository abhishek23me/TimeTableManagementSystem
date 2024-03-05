import React from "react";

function ContactUs() {
  const dashbordStyle = {
    backgroundColor: "white",
    marginLeft: "2%",
    margin: "7px",
    height: "90px",
    width: "96%",
    boxShadow: "4px 4px 7px 7px rgb(0 0 0/15%)",
    borderRadius: "5px",
  };

  const itemStyle = {
    backgroundColor: "#f7f7f7",
    height: "50px",
    fontSize: "24.5px",
    margin: "0px 0px 7px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center", // Align items vertically centered
    justifyContent: "center",
    color: "blue",
    paddingLeft: "6px",
  };

  const contentStyle = {
    // flex: "1 1 41rem",
    textAlign: "center",
  };

  const iconsStyle = {
    background: "#f7f7f7",
    padding: "25px",
    // marginTop:"20px",
    marginLeft: "20px",
    width: "350px",
    height: "150px",
    borderRadius: "10px ",
    color: "blue",
    fontSize: "45px",
    boxShadow: "1px 1px 2px 2px rgb(0 0 0/15%)",
  };

  const aboutStyle = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "3rem",
  };
  const iconsContainerStyle = {
    marginTop: "2rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    alignItems: "center",
    justifyContent: "center", 
  };

  const span1Style = {
    fontSize: "25px",
    paddingTop: "2px",
    color: "black",
    fontWeight: "700",
    display: "block",
  };

  return (
    <>
      <div style={dashbordStyle}>
        <div style={itemStyle}>Contact Detail</div>
      </div>
      <section style={aboutStyle}>
        <div style={contentStyle}>
          <div style={iconsContainerStyle}> 
            <div style={iconsStyle}>
              <i className="fas fa-phone"></i>
              <span style={span1Style}>+91 8107381122</span>
            </div>
            <div style={iconsStyle}>
              <i className="fas fa-phone"></i>
              <span style={span1Style}>+91 7296826652</span>
            </div>
            <div style={iconsStyle}>
              <i className="fas fa-envelope"></i>
              <span style={span1Style}>ttmsofficial@gmail.com</span>
            </div>
            <div style={iconsStyle}>
              <i className="fas fa-map"></i>
              <span style={span1Style}>sector14,bhopal,india</span>
            </div>
            <div style={iconsStyle}>
              <a
                href="https://api.whatsapp.com/send?phone=3197010240285"
                style={{
                  display: "inline-block",
                  padding: "12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontFamily: "sans-serif",
                }}
              >
                <i
                  className="fa-brands fa-whatsapp fa-bounce"
                  style={{ color: "#4cb021" }}
                ></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
