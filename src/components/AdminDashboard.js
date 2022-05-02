import React, { useEffect } from "react";
import { useState } from "react";
import "../assets/css/leftmenu.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const MovieOption = [];
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
  const [userData, setUserData] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  // console.log(userData);

  const token = JSON.parse(localStorage.getItem("token"));
  const [changeModal, setchangeModal] = useState(false);
  // console.log(userData);

  // Create Modal Hendel
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
    book: "",
    userType: "user",
  });

  const [registerError, setregisterError] = useState({
    fastName: false,
    lastName: false,
    email: false,
    password: false,
    phone: false,
    adhaar: false,
  });
  const [editUserData, seteditUserData] = useState({
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
    book: "",
    userType: "user",
  });
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
      book: "",
      userType: "user",
    });
  };
  const handleChangeGender = (value) => {
    changeModal === true
      ? seteditUserData({ ...editUserData, gender: value.value })
      : setregisterValue({ ...registerValue, gender: value.value });
  };
  const handleChangeMStatus = (value) => {
    changeModal === true
      ? seteditUserData({ ...editUserData, maritialStatus: value.value })
      : setregisterValue({ ...registerValue, maritialStatus: value.value });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setchangeModal(false);
  };
  const handleShow = () => {
    setShow(true);
    clearData();
  };
  const createSubmitModal = () => {
    console.log(registerValue);
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
          text: "User Created Successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        getUserData();

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
  // Handler Close Create Modal

  // Edit User Data
  function EditUserData(e, i) {
    // console.log("EditUserData >>>>", i);

    setchangeModal(true);
    setShow(true);
    localStorage.setItem("edituserId", JSON.stringify(userData[i]._id));

    seteditUserData({
      firstName: userData[i].firstName,
      lastName: userData[i].lastName,
      email: userData[i].email,
      password: "",
      address: userData[i].address,
      city: userData[i].city,
      state: userData[i].state,
      zipcode: userData[i].zipcode,
      age: userData[i].age,
      phone: userData[i].phone,
      adhaar: userData[i].adhaar,
      maritialStatus: "",
      gender: "",
      book: "",
    });
  }

  const EditSubmitModal = async () => {
    const edituserId = JSON.parse(localStorage.getItem("edituserId"));

    var config = {
      method: "put",
      url: `http://localhost:3000/users/${edituserId}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: editUserData,
    };

    await axios(config)
      .then((res) => {
        // console.log(res);
        getUserData();
      })
      .catch((err) => console.log(err));
    localStorage.removeItem("edituserId");
    setchangeModal(false);
    setShow(false);
  };

  // Delete User Data
  async function DeleteUserData(e, i) {
    localStorage.setItem("deleteuserId", JSON.stringify(userData[i]._id));
    const deleteuserId = JSON.parse(localStorage.getItem("deleteuserId"));

    console.log("DeleteUserData index>>>>", i);
    console.log("local delete user data >>>>>", deleteuserId);

    var config = {
      method: "delete",
      url: `http://localhost:3000/users/${deleteuserId}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    await axios(config)
      .then((res) => {
        // console.log(res);
        getUserData();
      })
      .catch((err) => console.log(err));

    localStorage.removeItem("deleteuserId");
  }

  // Show User data Start
  const [viewUserData, setviewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    age: "",
    phone: "",
    adhaar: "",
    maritialStatus: "",
    gender: "",
    book: "",
  });
  // console.log(viewUserData);
  const [showUser, setShowUser] = useState(false);

  const handleCloseUser = () => setShowUser(false);

  function ViewUserData(e, i) {
    // console.log("ViewUserData index >>> ", i);

    setShowUser(true);

    setviewUserData({
      firstName: userData[i].firstName,
      lastName: userData[i].lastName,
      email: userData[i].email,
      address: userData[i].address,
      city: userData[i].city,
      state: userData[i].state,
      zipcode: userData[i].zipcode,
      age: userData[i].age,
      phone: userData[i].phone,
      adhaar: userData[i].adhaar,
      maritialStatus: userData[i].maritialStatus,
      gender: userData[i].gender,
    });
  }
  // Show User data End

  useEffect(() => {
    getUserData();
    getBookData();
  }, []);

  const getUserData = () => {
    if (token.token) {
      axios
        .get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Authorization token not avelible");
    }
  };
  const getBookData = () => {
    if (token.token) {
      axios
        .get("http://localhost:3000/books", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          setAllBooks(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Authorization token not avelible");
    }
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <div>
          <button className="create-user-btn" onClick={handleShow}>
            + Create User
          </button>
        </div>
        <div>
          <table cellSpacing="0" cellPadding="0" className="table-parent">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Adhaar</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <button
                        className="rounded-circle view-user-btn"
                        onClick={(e) => ViewUserData(e, i)}
                      >
                        {ele.firstName.charAt(0)}
                      </button>
                    </td>
                    <td>{ele.firstName}</td>
                    <td>{ele.lastName}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phone}</td>
                    <td>{ele.adhaar}</td>
                    <td>
                      <button
                        className="edit-user-btn"
                        style={{ marginLeft: "3px" }}
                        onClick={(e) => DeleteUserData(e, i)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <button
                        className="edit-user-btn"
                        onClick={(e) => EditUserData(e, i)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Modal for Create and Update User  */}
        <Modal show={show} onHide={handleClose} className="w-100">
          <Modal.Header closeButton>
            <Modal.Title>
              {changeModal === true
                ? "Please Enter User Data and Update"
                : "Please Enter User Data and Create"}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row row-col-1 row-cols-sm-2">
              <div className="col">
                <div>
                  <div className="text-black">First Name</div>
                  <input
                    className={registerError.fastName ? "error" : "inp-text"}
                    type="text"
                    value={
                      changeModal === true
                        ? editUserData.firstName
                        : registerValue.firstName
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            firstName: e.target.value,
                          })
                        : setregisterValue({
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
                    value={
                      changeModal === true
                        ? editUserData.lastName
                        : registerValue.lastName
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            lastName: e.target.value,
                          })
                        : setregisterValue({
                            ...registerValue,
                            lastName: e.target.value,
                          });
                      setregisterError({ ...registerError, fastName: false });
                    }}
                  />
                </div>
                <div>
                  <div className="text-black">Email</div>
                  <input
                    className={registerError.email ? "error" : "inp-text"}
                    type="email"
                    value={
                      changeModal === true
                        ? editUserData.email
                        : registerValue.email
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            email: e.target.value,
                          })
                        : setregisterValue({
                            ...registerValue,
                            email: e.target.value,
                          });
                      setregisterError({ ...registerError, fastName: false });
                    }}
                  />
                </div>
                <div>
                  <div className="text-black">Password</div>
                  <input
                    className={registerError.password ? "error" : "inp-text"}
                    type="password"
                    value={
                      changeModal === true
                        ? editUserData.password
                        : registerValue.password
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            password: e.target.value,
                          })
                        : setregisterValue({
                            ...registerValue,
                            password: e.target.value,
                          });
                      setregisterError({ ...registerError, fastName: false });
                    }}
                  />
                </div>
                <div>
                  <div className="text-black">Address</div>
                  <input
                    className="inp-text"
                    type="text"
                    value={
                      changeModal === true
                        ? editUserData.address
                        : registerValue.address
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            address: e.target.value,
                          })
                        : setregisterValue({
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
                    value={
                      changeModal === true
                        ? editUserData.city
                        : registerValue.city
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            city: e.target.value,
                          })
                        : setregisterValue({
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
                    value={
                      changeModal === true
                        ? editUserData.state
                        : registerValue.state
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            state: e.target.value,
                          })
                        : setregisterValue({
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
                    value={
                      changeModal === true
                        ? editUserData.zipcode
                        : registerValue.zipcode
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            zipcode: e.target.value,
                          })
                        : setregisterValue({
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
                    value={
                      changeModal === true
                        ? editUserData.age
                        : registerValue.age
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            age: e.target.value,
                          })
                        : setregisterValue({
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
                    value={
                      changeModal === true
                        ? editUserData.phone
                        : registerValue.phone
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            phone: e.target.value,
                          })
                        : setregisterValue({
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
                    value={
                      changeModal === true
                        ? editUserData.adhaar
                        : registerValue.adhaar
                    }
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            adhaar: e.target.value,
                          })
                        : setregisterValue({
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

                <div>
                  <div className="text-black">Book</div>
                  <select
                    placeholder="Select book"
                    className="inp-text"
                    onChange={(e) => {
                      changeModal === true
                        ? seteditUserData({
                            ...editUserData,
                            book: e.target.value,
                          })
                        : setregisterValue({
                            ...registerValue,
                            book: e.target.value,
                          });
                    }}
                  >
                    {allBooks.map((e, i) => {
                      return (
                        <option key={i} value={e._id}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={
                changeModal === true ? EditSubmitModal : createSubmitModal
              }
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for View User Data  */}

        <Modal show={showUser} onHide={handleCloseUser}>
          <Modal.Header closeButton>
            <Modal.Title>User Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row row-col-1 row-cols-sm-2">
              <div className="col">
                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    First Name :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.firstName}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Last Name :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.lastName}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Email :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.email}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Address :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.address}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    City :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.city}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    State :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.state}
                  </span>
                </div>
              </div>
              <div className="col">
                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Zip Code :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.zipcode}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Age :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.age}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Phone :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.phone}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Adhaar :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.adhaar}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Meritial Status :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.maritialStatus}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Gender :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.gender}
                  </span>
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Books :{" "}
                  </div>
                  <span
                    style={{
                      justifyContent: "flex-end",
                      marginLeft: "1.3rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {viewUserData.book}
                  </span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUser}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminDashboard;
