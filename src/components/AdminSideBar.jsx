import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection
import logo from "../ttmss.png";
import adminimg from "../admin1.png";

const AdminSideBar = ({
    onSidebarClick,
    onFacultySearchClick,
    onShowHomeClick,
    onChangePasswordClick,
    onRegisterFacultyClick,
    onSubjectsSearchClick, 
    onAddSubjectClick,   
    onEditSubjectsClick,
}) => {
    const [userName, setUserName] = useState("");
    const history = useNavigate(); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("User ID not found in localStorage");
                    return;
                }

                // Fetch user data using the userId
                const response = await fetch(`/api/auth/userprofile?id=${userId}`);
                const data = await response.json();

                if (data.success) {
                    // Assuming 'name' is the field containing the username
                    setUserName(data.userProfile.username);
                } else {
                    console.error("Error fetching user data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleSignOut = () => {
        // Remove userId from localStorage
        localStorage.removeItem("userId");
        console.log("userid removed from localstorage");

        // Redirect to login page
        history("/login");
    };

    const logos = {
        height: "45px",
        width: "50px",
        marginLeft: "10px",
        marginTop: "-6px",
    };

    const navbar = {
        opacity: "1",
        background: "linear-gradient(to right, #2455a3, rgb(99 149 228),#2455a3)",
        height: "54px",
        width: "100%",
    };

    const navbars = {
        opacity: "1",
        background:
            "linear-gradient(to right, rgb(36 85 163), rgb(99 149 228),#2455a3)",
        // background: linear-gradient(to right, rgb(66 0 147), rgb(177 145 206), rgb(102 36 163));
        height: "54px",
    };

    const main = {
        display: "flex",
    };

    const btn = {
        background: "linear-gradient(to right, #2657a5,#2657a5)",
        border: "none",
        marginLeft: "10px",
        fontSize: "20px",
        marginTop: "11px",
        color: "white",
    };

    const btnn = {
        background: "linear-gradient(to right, rgb(50 100 178),rgb(39 88 166))",
        border: "none",
        marginLeft: "10px",
        fontSize: "20px",
        marginTop: "2px",
        color: "white",
    };

    const svg = {
        fill: "rgb(255 255 255)",
        marginTop: "-4px",
        marginLeft: "6px",
        height: "26px",
        width: "31px",
        marginBottom: "3px",
        marginTop:"-88px",marginLeft:"169px"
  
    };

    const userDisplay = {
        float: "right",
        marginRight: "2%",
        marginTop: "8px",
        background: "transparent",
        border: "none",
        marginTop:"-49px",
        
  
    };

    const drop = {
        background:
            "linear-gradient(to right, rgb(36 85 163), rgb(99 149 228),#2455a3)",
        border: "none",
        width: "300px",
        borderRadius: "0",
    };

    const pic = {
        borderBottom: "1px solid white",
        height: "78px",
    };

    const picimg = {
        height: "64px",
        display: "flex",
        width: "61px",
        margin: "auto",
    };

    const signout = {
        marginTop: "8px",
    };

    const sign = {
        background: "#198754",
        display: "flex",
        width: "230px",
        height: "31px",
        borderRadius: "4px",
        justifyContent: "center",
        color: "white",
        border: "none",
        margin: "auto",
    };

    const contactUs = {
        marginTop: "20px",
        display: "flex",
        height: "30px",
        // border: "2px solid black",
        marginLeft: "4%",
        width: "369px",
    };

    const Logo = {
        float: "left",
        marginLeft: "10px",
        marginTop: "5px",
    };
    const Logo2 = {
        marginLeft: "-3px",
        marginTop: "5px",
    };

    const drops = {
        display: "flex",
        background: "white",
        border: "none",
        color: "black",
        width: "92%",
        height: "34px",
        borderRadius: "0px",
        marginLeft: "4%",
        transition: "transform 0.3s ease-in-out" /* Add transition property */,
    };

    const Logo21 = {
        height: "20px",
        marginLeft: "240px",
        marginTop: "2px",
        transition: "transform 0.3s ease-in-out" /* Add transition property */,
    };

    const text2 = {
        marginLeft: "0.7rem",
        marginTop: "-4px",
    };

    // const contactText1 = {
    //   width: "150px",
    // };

    const Contacttext = {
        marginLeft: "13px",
        fontSize: "15px",
        width: "130px",
        marginBottom: "4px",
        marginTop: "2px",
    };

    const lii = {
        width: "329px",
        marginLeft: "38px",
        height: "24px",
        display: "flex",
    };

    const profilelogo = {
        marginTop: "2px",
        paddingRight: "11px",
    };

    const block = {
        display: "flex",
    };

    return (
        <>
            <div style={main}>
                <div style={navbar}>
                    <button
                        style={btn}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling"
                        aria-controls="offcanvasScrolling"
                    >
                        ☰
                    </button>

                    <div
                        className="offcanvas offcanvas-start"
                        data-bs-scroll="true"
                        data-bs-backdrop="false"
                        tabIndex="-1"
                        id="offcanvasScrolling"
                        aria-labelledby="offcanvasScrollingLabel"
                    >
                        <div className="offcanvas-header" style={navbars}>
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel" style={{color:"white"}}>
                                TTMS Menu
                            </h5>
                            <button
                                type="button"
                                style={btnn}
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            >
                                ☰
                            </button>
                        </div>

                        <div style={{ position: "relative", zIndex: 1 }}>
                            <button
                                style={drops}
                                className="btn btn-secondary"
                                type="button"
                                // data-bs-toggle="dropdown"
                                // aria-expanded="false"
                                onClick={onSidebarClick}
                            >
                                <i
                                    style={Logo2}
                                    className="fa fa-briefcase iconSpaceHeader "
                                ></i>
                                <p style={text2}>Profile</p>
                            </button>
                        </div>

                        <div>
                            <button
                                style={drops}
                                className="btn btn-secondary"
                                type="button"
                                onClick={onRegisterFacultyClick}
                            // data-bs-toggle="dropdown"
                            // aria-expanded="false"
                            >
                                <i
                                    style={Logo2}
                                    className="fa fa-graduation-cap iconSpaceHeader "
                                ></i>
                                <p style={text2}>Register Faculty</p>
                            </button>
                        </div>
                        <div>
                            <button
                                style={drops}
                                className="btn btn-secondary"
                                type="button"
                                onClick={onAddSubjectClick}
                            // data-bs-toggle="dropdown"
                            // aria-expanded="false"
                            >
                                <i
                                    style={Logo2}
                                    className="fa fa-graduation-cap iconSpaceHeader "
                                ></i>
                                <p style={text2}>Add Subjects</p>
                            </button>
                        </div>
                        <div>
                            <button
                                style={drops}
                                className="btn btn-secondary"
                                type="button"
                                onClick={onChangePasswordClick}
                            >
                                <i className="fa fa-lock iconSpace "></i>
                                <p style={text2}>Change Password</p>
                            </button>
                        </div>
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <button
                                style={drops}
                                className="btn btn-secondary"
                                type="button"
                                // data-bs-toggle="dropdown"
                                // aria-expanded="false"
                                onClick={onFacultySearchClick}
                            >
                                <i
                                    style={Logo2}
                                    className="fa fa-briefcase iconSpaceHeader "
                                ></i>
                                <p style={text2}>Faculty Search</p>
                            </button>
                        </div>
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <button
                                style={drops}
                                className="btn btn-secondary"
                                type="button"
                                // data-bs-toggle="dropdown"
                                // aria-expanded="false"
                                onClick={onSubjectsSearchClick}
                            >
                                <i
                                    style={Logo2}
                                    className="fa fa-briefcase iconSpaceHeader "
                                ></i>
                                <p style={text2}>Subjects Search</p>
                            </button>
                        </div>
                        {/* <div style={{ position: "relative", zIndex: 1 }}>
                            <button
                                style={drops}
                                className="btn btn-secondary"
                                type="button"
                                // data-bs-toggle="dropdown"
                                // aria-expanded="false"
                                onClick={onEditSubjectsClick}
                            >
                                <i
                                    style={Logo2}
                                    className="fa fa-briefcase iconSpaceHeader "
                                ></i>
                                <p style={text2}>Edit Subjects</p>
                            </button>
                        </div> */}
                    </div>
                    <img style={logos} src={logo} alt="logo not found" /> <p style={{marginTop:"-39px",color: "white",fontSize:"22px",marginLeft:"109px"}}>TTMS </p>
                    <svg
                        onClick={onShowHomeClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={svg}
                    >
                        <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
                    </svg>
                    <button
                        style={userDisplay}
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {userName ? `${userName}` (Admin) : "Loading..."}
                    </button>
                    <ul className="dropdown-menu" style={drop}>
                        <li style={pic}>
                            <a className="dropdown-item" href="#">
                                <img style={picimg} src={adminimg} alt="not found" />
                            </a>
                        </li>
                        <li style={signout}>
                            <button style={sign} onClick={handleSignOut}>
                                {" "}
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AdminSideBar;