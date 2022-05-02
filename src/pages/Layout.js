import React from "react";
import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="row g-0" style={{ backgroundColor: "#fff " }}>
        <div
          className="col-md-2"
          style={{
            height: "100vh",
            backgroundColor: "#f9fafb",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <LeftMenu />
        </div>
        <div className="col-md-10">
          <div
            style={{
              height: "7vh",
              backgroundColor: "#f8f9fa",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            {" "}
            <Header />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
