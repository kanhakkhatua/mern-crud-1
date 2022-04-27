import React from "react";
import { useState, useEffect } from "react";
import "../assets/css/login.css";
import { HiOutlineLogin } from "react-icons/hi";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";

const userTypeOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];
const meritialStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "widowed", label: "Widowed" },
  { value: "divorced", label: "Divorced" },
  { value: "married but separated", label: "Married but separated" },
];

function Login() {
  const [loginValue, setLoginValue] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const handleChangeGender = (value) => {
    setregisterValue({ ...registerValue, gender: value.value });
  };
  const handleChangeUserType = (value) => {
    setregisterValue({ ...registerValue, userType: value.value });
  };
  const handleChangeMStatus = (value) => {
    setregisterValue({ ...registerValue, maritialStatus: value.value });
  };

  const [registerValue, setregisterValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    age: "",
    phone: "",
    adhaar: "",
    maritialStatus: "",
    gender: "",
    userType: "",
  });
  console.log(registerValue);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = () => {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!loginValue.loginEmail) {
      return setErrorEmail(true);
    } else if (!regex.test(loginValue.loginEmail)) {
      return setErrorEmail(true);
    }
    if (!loginValue.loginPassword) {
      return setErrorPassword(true);
    }
  };

  return (
    <>
      <div className="card">
        <div className="container py-4">
          <div style={{ textAlign: "center", width: "100%" }}>
            <p className="ptext" style={{ fontWeight: "400" }}>
              Welcome Back
            </p>
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

            <input
              className={errorEmail ? "error" : "inp-text"}
              type="email"
              value={loginValue.loginEmail}
              onChange={(e) => {
                setLoginValue({
                  ...loginValue,
                  loginEmail: e.target.value,
                });
                setErrorEmail(false);
              }}
            />

            <div style={{ display: "flex" }}>
              <div className="text-black" style={{ marginTop: "1.25rem" }}>
                Password
              </div>
              <div className="forget-pass">Forget Password ?</div>
            </div>

            <input
              className={errorPassword ? "error" : "inp-text"}
              type="password"
              value={loginValue.loginPassword}
              onChange={(e) => {
                setLoginValue({
                  ...loginValue,
                  loginPassword: e.target.value,
                });
                setErrorPassword(false);
              }}
            />

            <div className=" d-flex justify-content-center my-3">
              <button className="login-btn" onClick={handleLogin}>
                <HiOutlineLogin /> Login
              </button>
            </div>

            <div className="d-flex justify-content-center">
              New user please
              <div className="register-btn" onClick={handleShow}>
                &nbsp; Register.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Your Data and Register !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <div>
                <div className="text-black">First Name</div>
                <input
                  className="inp-text"
                  type="text"
                  value={registerValue.firstName}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      firstName: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Last Name</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">Email</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">Password</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">Address</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">City</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">State</div>
                <input className="inp-text" type="text" />
              </div>
            </div>
            <div className="col">
              <div>
                <div className="text-black">Zip Code</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">Age</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">Phone</div>
                <input className="inp-text" type="text" />
              </div>
              <div>
                <div className="text-black">Adhaar</div>
                <input className="inp-text" type="text" />
              </div>
              <div style={{ marginTop: "0.6rem" }}>
                <div className="text-black">Merital Status</div>
                <Select
                  placeholder="Select Merital Status"
                  options={meritialStatusOptions}
                  value={registerValue.maritialStatus}
                  onChange={handleChangeMStatus}
                />
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <div className="text-black">Gender</div>
                <Select
                  placeholder="Select Gender"
                  options={genderOptions}
                  value={registerValue.gender}
                  onChange={handleChangeGender}
                />
              </div>
              <div style={{ marginTop: "0.6rem" }}>
                <div className="text-black">User Type</div>
                <Select
                  placeholder="Select User Type"
                  options={userTypeOptions}
                  value={registerValue.userType}
                  onChange={handleChangeUserType}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
