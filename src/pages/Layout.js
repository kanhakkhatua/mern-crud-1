import React from "react";
import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="d-flex flex-row">
        <div
          style={{
            position: "fixed",
            width: "12rem",
            height: "100vh",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <LeftMenu />
        </div>

        <div
          className=" d-flex flex-column"
          style={{ marginLeft: "12rem", width: "90%" }}
        >
          <div
            className="sticky-top"
            style={{
              height: "7vh",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <Header />
          </div>
          <div style={{ height: "92vh", overflow: "scroll" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
