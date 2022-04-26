import React from "react";
import "../assets/css/login.css";
import { HiOutlineLogin } from "react-icons/hi";

function Login() {
  return (
    <>
      <div className="card">
        <div className="container py-4">
          <div style={{ textAlign: "center", width: "100%" }}>
            <p className="ptext">Welcome Back</p>
            <p className="ptext">Sign in to continue</p>
          </div>
          <div
            style={{
              paddingBottom: "0.25rem",
              paddingTop: "0.25rem",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <p style={{ height: "5rem" }}>&nbsp;</p>
          </div>
          <div className="formclass">
            <div className="text-black">Email</div>
            <input className="inp-text" type="text" />

            <div style={{ display: "flex" }}>
              <div className="text-black" style={{ marginTop: "1.25rem" }}>
                Password
              </div>
              <div className="forget-pass">Forget Password ?</div>
            </div>
            <input className="inp-text" type="text" />
            <div className=" d-flex justify-content-center my-3">
              <button className="login-btn">
                <HiOutlineLogin /> Login
              </button>
            </div>

            <div className="d-flex justify-content-center">
              New user please
              <div
                className="register-btn"
                // style={{
                //   cursor: "pointer",
                //   fontSize: "1.3rem",
                //   fontWeight: "300",
                // }}
              >
                &nbsp; Register.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
