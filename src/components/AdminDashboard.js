import React, { useEffect } from "react";
import { useState } from "react";
import "../assets/css/leftmenu.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const AdminDashboard = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [adminData, setAdminData] = useState({});
  // console.log(adminData);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adhaar: "",
  });

  const [show, setShow] = useState(false);

  const getAdminData = () => {
    if (token.token) {
      axios
        .get(`http://localhost:3000/admins?id=${token.data._id}`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          setAdminData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Authorization token not avelible");
    }
  };
  useEffect(() => {
    getAdminData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditData({
      ...editData,
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      phone: adminData.phone,
      adhaar: adminData.adhaar,
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

        getAdminData();
      })
      .catch((err) => console.log(err));

    setShow(false);
  };

  return (
    <>
      <div style={{ margin: "3rem" }}>
        <div className="card " style={{ width: "18rem", height: "auto" }}>
          <div className="card-body">
            <h5 className="card-title">{`${token.data.userType} Data`}</h5>

            <div>
              <div className="text-black">
                First Name:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {adminData.firstName}
                </span>
              </div>
              <div className="text-black">
                Last Name:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {adminData.lastName}
                </span>
              </div>
              <div className="text-black">
                Email:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {adminData.email}
                </span>
              </div>
              <div className="text-black">
                Phone:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {adminData.phone}
                </span>
              </div>
              <div className="text-black">
                Adhaar:{" "}
                <span style={{ fontWeight: "400", marginLeft: "10px" }}>
                  {adminData.adhaar}
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
              <div className="text-black">First Name :</div>
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
};

export default AdminDashboard;
