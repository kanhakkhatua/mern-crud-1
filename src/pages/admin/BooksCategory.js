import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function BooksCategory() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [allBookCategory, setAllBooksCategory] = useState([]);
  const [createBookCategory, setCreateBookCategory] = useState({
    bookCategory: "",
  });
  const [editBookCategory, setEditBookCategory] = useState({
    bookCategory: "",
  });
  const [changeModal, setchangeModal] = useState(false);

  const getCategoryData = () => {
    if (token.token) {
      axios
        .get("http://localhost:3000/bookcategory", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          setAllBooksCategory(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Authorization token not avelible");
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setchangeModal(false);
  };
  const handleShow = () => setShow(true);

  const SubmitCategory = () => {
    // console.log(createBookCategory);
    var config = {
      method: "post",
      url: "http://localhost:3000/bookcategory",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: createBookCategory,
    };
    axios(config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Book Category Created Successfully!",
          showConfirmButton: false,
          timer: 1000,
        });

        console.log(res);
        getCategoryData();
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
  const DeleteBook = async (e, i) => {
    localStorage.setItem(
      "deleteCategoryId",
      JSON.stringify(allBookCategory[i]._id)
    );
    const deleteCategoryId = JSON.parse(
      localStorage.getItem("deleteCategoryId")
    );

    var config = {
      method: "delete",
      url: `http://localhost:3000/bookcategory/${deleteCategoryId}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    await axios(config)
      .then((res) => {
        // console.log(res);
        localStorage.removeItem("deleteCategoryId");
        getCategoryData();
      })
      .catch((err) => console.log(err));
  };

  const EditBook = (e, i) => {
    setchangeModal(true);
    setShow(true);
    localStorage.setItem(
      "editCategoryId",
      JSON.stringify(allBookCategory[i]._id)
    );
    setEditBookCategory({
      bookCategory: allBookCategory[i].bookCategory,
    });
  };
  const SubmitEditData = async () => {
    const editCategoryId = JSON.parse(localStorage.getItem("editCategoryId"));

    var config = {
      method: "put",
      url: `http://localhost:3000/bookcategory/${editCategoryId}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: editBookCategory,
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("editCategoryId");
        getCategoryData();
      })
      .catch((err) => console.log(err));

    setchangeModal(false);
    setShow(false);
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <div>
          <button className="create-user-btn" onClick={handleShow}>
            + Book Category
          </button>
        </div>
        {/* Table  */}
        <div>
          <table className="table borderless">
            <thead>
              <tr>
                <th>Books Category</th>
                <th>Books Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBookCategory.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{ele.bookCategory}</td>
                    <td>
                      <ul>
                        {ele.books.map((e, i) => {
                          return (
                            <div key={i}>
                              <li>{e.name}</li>
                            </div>
                          );
                        })}
                      </ul>
                    </td>
                    <td>
                      <button
                        className="edit-user-btn"
                        style={{ marginLeft: "3px" }}
                        onClick={(e) => DeleteBook(e, i)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <button
                        className="edit-user-btn"
                        onClick={(e) => EditBook(e, i)}
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
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {changeModal ? "Edit Book Category" : "Create Book Category !"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className="text-black">Name :</div>
                <div>
                  <input
                    type="text"
                    className="inp-text"
                    value={
                      changeModal
                        ? editBookCategory.bookCategory
                        : createBookCategory.bookCategory
                    }
                    onChange={(e) => {
                      changeModal
                        ? setEditBookCategory({
                            ...editBookCategory,
                            bookCategory: e.target.value,
                          })
                        : setCreateBookCategory({
                            ...createBookCategory,
                            bookCategory: e.target.value,
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
              <Button
                variant="primary"
                onClick={changeModal ? SubmitEditData : SubmitCategory}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BooksCategory;
