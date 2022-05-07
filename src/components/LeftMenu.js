import React from "react";
import "../assets/css/leftmenu.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaBook } from "react-icons/fa";

function LeftMenu() {
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <div
      className="d-flex flex-column"
      style={{ marginLeft: "2rem", marginTop: "3.5rem" }}
    >
      <div>
        <Link to="./dashboard" className="link-class ">
          <span style={{ display: "flex" }}>
            <AiOutlineHome />{" "}
            <span style={{ justifyContent: "flex-end", marginLeft: "5px" }}>
              Dashboard
            </span>
          </span>
        </Link>
      </div>

      <div>
        <Link
          className="link-class "
          to={token.userType === "user" ? "./userbooks" : "./adminbooks"}
        >
          <i className="fa-solid fa-book"></i>{" "}
          <span style={{ justifyContent: "flex-end", marginLeft: "5px" }}>
            {token.userType === "user" ? "Books" : "Books"}
          </span>
        </Link>
      </div>

      {token.userType === "admin" ? (
        <>
          <div style={{ marginTop: "8px" }}>
            <Link to="./alluser" className="link-class">
              <span style={{ display: "flex" }}>
                <i className="fa-solid fa-user"></i>{" "}
                <span style={{ justifyContent: "flex-end", marginLeft: "5px" }}>
                  User Data
                </span>
              </span>
            </Link>
          </div>
          <div>
            <Link to="./bookcategory" className="link-class ">
              <span style={{ display: "flex" }}>
                <FaBook />
                <span style={{ justifyContent: "flex-end", marginLeft: "5px" }}>
                  Books Category
                </span>
              </span>
            </Link>
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default LeftMenu;
