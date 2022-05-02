import React from "react";
import "../assets/css/leftmenu.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaBook } from "react-icons/fa";

function LeftMenu() {
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <>
      <div className="main-div d-flex flex-column">
        <div>
          <Link to="./dashboard" className="link-class ">
            <span>
              <AiOutlineHome /> <span>Dashboard</span>
            </span>
          </Link>
        </div>
        <div className="d-flex justify-content-center my-3">
          <Link
            className="link-class "
            to={token.userType === "user" ? "./userbooks" : "./adminbooks"}
          >
            <i className="fa-solid fa-book"></i>{" "}
            {token.userType === "user" ? "Books" : "Books"}
          </Link>
        </div>

        <div>
          <Link to="./bookcategory" className="link-class ">
            <span>
              <FaBook />
              <span>Books Category</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LeftMenu;
