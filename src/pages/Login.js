import React from "react";
import { useState } from "react";
import "../assets/css/login.css";
import { HiOutlineLogin } from "react-icons/hi";
import { Modal, Button, Spinner } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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

  const [spinner, setSpinner] = useState(false);
  // console.log(spinner);

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
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
    userType: "user",
  });

  const handleChangeGender = (value) => {
    setregisterValue({ ...registerValue, gender: value.value });
  };
  const handleChangeUserType = (data) => {
    setregisterValue({ ...registerValue, userType: data.value });
  };
  const handleChangeMStatus = (value) => {
    setregisterValue({ ...registerValue, maritialStatus: value.value });
  };

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [registerError, setregisterError] = useState({
    fastName: false,
    lastName: false,
    email: false,
    password: false,
    phone: false,
    adhaar: false,
  });
  // console.log(registerError);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    clearData();
  };

  const clearData = () => {
    setregisterValue({
      ...registerValue,
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
      userType: "user",
    });
  };

  const handleLogin = () => {
    // console.log("login btn", loginValue);
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!loginValue.email) {
      return setErrorEmail(true);
    } else if (!regex.test(loginValue.email)) {
      return setErrorEmail(true);
    }
    if (!loginValue.password) {
      return setErrorPassword(true);
    }

    setSpinner(true);

    axios
      .post("http://localhost:3000/login", loginValue)
      .then((res) => {
        // console.log(res.data.data);

        if (res.status === 200) {
          localStorage.setItem(
            "token",
            JSON.stringify({
              token: res.data.token,
              userType: res.data.data.userType,
              data: res.data.data,
            })
          );
          setSpinner(false);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User Not Found ... Please Register !",
          footer: err,
        });
        setSpinner(false);
      });
  };

  const handleSubmitModal = () => {
    // console.log(registerValue);
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!registerValue.firstName) {
      return setregisterError({ ...registerError, fastName: true });
    }

    if (!registerValue.lastName) {
      return setregisterError({ ...registerError, lastName: true });
    }

    if (!registerValue.email) {
      return setregisterError({ ...registerError, email: true });
    } else if (!regex.test(registerValue.email)) {
      return setregisterError({ ...registerError, email: true });
    }
    if (!registerValue.password) {
      return setregisterError({ ...registerError, password: true });
    }
    if (!registerValue.phone) {
      return setregisterError({ ...registerError, phone: true });
    }
    if (!registerValue.adhaar) {
      return setregisterError({ ...registerError, adhaar: true });
    }

    axios
      .post("http://localhost:3000/users", registerValue)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Registered Successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        // console.log(res);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong!, Error: ${err}`,
          showConfirmButton: false,
          timer: 1000,
        });
      });

    setShow(false);
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
              value={loginValue.email}
              onChange={(e) => {
                setLoginValue({
                  ...loginValue,
                  email: e.target.value,
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
              value={loginValue.password}
              onChange={(e) => {
                setLoginValue({
                  ...loginValue,
                  password: e.target.value,
                });
                setErrorPassword(false);
              }}
            />

            <div className=" d-flex justify-content-center my-3">
              <button className="login-btn" onClick={handleLogin}>
                {spinner ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    style={{ height: "1.5rem", width: "1.5rem" }}
                  />
                ) : (
                  <>
                    <HiOutlineLogin /> <span>Login</span>
                  </>
                )}
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
                  className={registerError.fastName ? "error" : "inp-text"}
                  type="text"
                  value={registerValue.firstName}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      firstName: e.target.value,
                    });
                    setregisterError({ ...registerError, fastName: false });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Last Name</div>
                <input
                  className={registerError.lastName ? "error" : "inp-text"}
                  type="text"
                  value={registerValue.lastName}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      lastName: e.target.value,
                    });
                    setregisterError({ ...registerError, lastName: false });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Email</div>
                <input
                  className={registerError.email ? "error" : "inp-text"}
                  type="email"
                  value={registerValue.email}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      email: e.target.value,
                    });
                    setregisterError({ ...registerError, email: false });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Password</div>
                <input
                  className={registerError.password ? "error" : "inp-text"}
                  type="password"
                  value={registerValue.password}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      password: e.target.value,
                    });
                    setregisterError({ ...registerError, password: false });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Address</div>
                <input
                  className="inp-text"
                  type="text"
                  value={registerValue.address}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      address: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <div className="text-black">City</div>
                <input
                  className="inp-text"
                  type="text"
                  value={registerValue.city}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      city: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <div className="text-black">State</div>
                <input
                  className="inp-text"
                  type="text"
                  value={registerValue.state}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      state: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div>
                <div className="text-black">Zip Code</div>
                <input
                  className="inp-text"
                  type="text"
                  value={registerValue.zipcode}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      zipcode: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Age</div>
                <input
                  className="inp-text"
                  type="text"
                  value={registerValue.age}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      age: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Phone</div>
                <input
                  className={registerError.phone ? "error" : "inp-text"}
                  type="text"
                  value={registerValue.phone}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      phone: e.target.value,
                    });
                    setregisterError({ ...registerError, phone: false });
                  }}
                />
              </div>
              <div>
                <div className="text-black">Adhaar</div>
                <input
                  className={registerError.adhaar ? "error" : "inp-text"}
                  type="text"
                  value={registerValue.adhaar}
                  onChange={(e) => {
                    setregisterValue({
                      ...registerValue,
                      adhaar: e.target.value,
                    });
                    setregisterError({ ...registerError, adhaar: false });
                  }}
                />
              </div>
              <div style={{ marginTop: "0.6rem" }}>
                <div className="text-black">Merital Status</div>
                <Select
                  placeholder="Select Merital Status"
                  options={meritialStatusOptions}
                  onChange={handleChangeMStatus}
                />
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <div className="text-black">Gender</div>
                <Select
                  placeholder="Select Gender"
                  options={genderOptions}
                  onChange={handleChangeGender}
                />
              </div>
              <div style={{ marginTop: "0.6rem" }}>
                <div className="text-black">User Type</div>
                <Select
                  placeholder="Select User Type"
                  options={userTypeOptions}
                  defaultValue={userTypeOptions[0]}
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
          <Button variant="primary" onClick={handleSubmitModal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
