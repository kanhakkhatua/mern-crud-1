import React, { useEffect } from "react";
import { useState } from "react";
import "../assets/css/leftmenu.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";

function UserDashboard() {
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
  const token = JSON.parse(localStorage.getItem("token"));
  const [userData, setUserData] = useState({});
  // console.log(adminData);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adhaar: "",
    address: "",
    age: "",
    city: "",
    gender: "",
    maritialStatus: "",
    state: "",
    zipcode: "",
    books: "",
  });
  const [allBooks, setAllBooks] = useState([]);

  const handleChangeGender = (value) => {
    setEditData({ ...editData, gender: value.value });
  };
  const handleChangeMStatus = (value) => {
    setEditData({ ...editData, maritialStatus: value.value });
  };

  const [show, setShow] = useState(false);
  const getUserData = () => {
    if (token.token) {
      axios
        .get(`http://localhost:3000/users?id=${token.data._id}`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          console.log(res);
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
  useEffect(() => {
    getUserData();
    getBookData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditData({
      ...editData,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      adhaar: userData.adhaar,
      address: userData.address,
      age: userData.age,
      city: userData.city,
      gender: userData.gender,
      maritialStatus: userData.maritialStatus,
      state: userData.state,
      zipcode: userData.zipcode,
    });
    setShow(true);
  };

  const handleSubmit = async () => {
    // console.log(editData);

    var config = {
      method: "put",
      url: `http://localhost:3000/users/${token.data._id}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: editData,
    };

    await axios(config)
      .then((res) => {
        // console.log(res);

        getUserData();
      })
      .catch((err) => console.log(err));

    setShow(false);
  };

  return (
    <>
      <div style={{ margin: "3rem" }}>
        <div className="card " style={{ width: "27rem", height: "auto" }}>
          <div className="card-body">
            <h5 className="card-title">{`${token.data.userType} Data`}</h5>

            <div>
              <div className="text-black">
                First Name:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.firstName}
                </span>
              </div>
              <div className="text-black">
                Last Name:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.lastName}
                </span>
              </div>
              <div className="text-black">
                Email:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.email}
                </span>
              </div>
              <div className="text-black">
                Phone:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.phone}
                </span>
              </div>
              <div className="text-black">
                Adhaar:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.adhaar}
                </span>
              </div>

              <div className="text-black">
                Address:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.address}
                </span>
              </div>
              <div className="text-black">
                Age:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.age}
                </span>
              </div>
              <div className="text-black">
                City:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.city}
                </span>
              </div>
              <div className="text-black">
                Gender:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.gender}
                </span>
              </div>
              <div className="text-black">
                Maritial Status:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.maritialStatus}
                </span>
              </div>
              <div className="text-black">
                State:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.state}
                </span>
              </div>
              <div className="text-black">
                Zip Code:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {userData.zipcode}
                </span>
              </div>

              <div className="text-black">
                Books:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  <ul>
                    {userData.books &&
                      userData.books.map((e, i) => {
                        return (
                          <div key={i}>
                            <li>{e.name}</li>
                          </div>
                        );
                      })}
                  </ul>
                </span>
              </div>

              <div>
                <button
                  style={{
                    border: "none",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                  onClick={handleShow}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span style={{ marginLeft: "3px" }}>Update User Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal  */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row row-col-1 row-cols-sm-2">
              <div className="col">
                <div>
                  <div className="text-black">First Name :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.firstName}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          firstName: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black">Last Name :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.lastName}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          lastName: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black">Email :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.email}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black">Phone :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.phone}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          phone: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black">Adhaar :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.adhaar}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          adhaar: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black">Age :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.age}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          age: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div>
                  <div className="text-black">City :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.city}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          city: e.target.value,
                        });
                      }}
                    />
                  </div>
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
                  <div className="text-black">State :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.state}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          state: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black">Zip Code :</div>
                  <div>
                    <input
                      type="text"
                      className="inp-text"
                      value={editData.zipcode}
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          zipcode: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black">Book : </div>
                  <select
                    placeholder="Select book"
                    className="inp-text"
                    onChange={(e) => {
                      setEditData({
                        ...editData,
                        books: e.target.value,
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
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default UserDashboard;
