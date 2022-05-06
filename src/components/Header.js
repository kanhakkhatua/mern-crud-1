import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  var HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="dropdown">
        <button
          className="rounded-circle dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          style={{
            border: "none",
            float: "right",
            marginTop: "0.5rem",
            marginRight: "0.5rem",
            padding: "0.5rem",
          }}
        >
          <i className="fa-solid fa-user"></i>
        </button>

        <ul
          className="dropdown-menu"
          // style={{ width: "2rem" }}
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <Link
              to="./dashboard"
              className="header-btn"
              style={{ textDecoration: "none", color: "black" }}
            >
              <i className="fa-solid fa-user"></i>{" "}
              <span style={{ marginLeft: "0.5rem" }}>Profile</span>
            </Link>
          </li>
          <li>
            <button className="header-btn" onClick={HandleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
              <span style={{ marginLeft: "0.5rem" }}>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
