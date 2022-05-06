import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const AdminBooks = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [allBooks, setAllBooks] = useState([]);
  const [allBookCategory, setAllBooksCategory] = useState([]);
  const [changeModal, setchangeModal] = useState(false);

  const [createBooksData, setcreateBooksData] = useState({
    name: "",
    authorName: "",
    publisher: "",
    publishYear: "",
    price: "",
    pages: "",
    category: "",
  });
  // console.log("createBooksData >>", createBooksData);
  const [editBookData, seteditBookData] = useState({
    name: "",
    authorName: "",
    publisher: "",
    publishYear: "",
    price: "",
    pages: "",
    category: "",
  });
  const clearData = () => {
    setcreateBooksData({
      ...createBooksData,
      name: "",
      authorName: "",
      publisher: "",
      publishYear: "",
      price: "",
      pages: "",
      category: "",
    });
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

  const getBookCategory = () => {
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
    getBookData();
    getBookCategory();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setchangeModal(false);
    setShow(false);
  };
  const handleShow = () => {
    clearData();
    setShow(true);
  };

  const CreateSubmitBook = () => {
    // console.log("createBooksData >>>", createBooksData);
    var config = {
      method: "post",
      url: "http://localhost:3000/books",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: createBooksData,
    };
    axios(config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Book Created Successfully!",
          showConfirmButton: false,
          timer: 1000,
        });

        console.log(res);
        getBookData();
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

  function EditBook(e, i) {
    setchangeModal(true);
    setShow(true);
    localStorage.setItem("editBookId", JSON.stringify(allBooks[i]._id));
    seteditBookData({
      name: allBooks[i].name,
      authorName: allBooks[i].authorName,
      publisher: allBooks[i].publisher,
      publishYear: allBooks[i].publishYear,
      price: allBooks[i].price,
      pages: allBooks[i].pages,
    });
  }

  const EditSubmitBook = async () => {
    const editBookId = JSON.parse(localStorage.getItem("editBookId"));
    console.log("Edit Submit Books >>", editBookData);
    console.log("Edit book id >>", editBookId);

    var config = {
      method: "put",
      url: `http://localhost:3000/books/${editBookId}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: editBookData,
    };

    await axios(config)
      .then((res) => {
        // console.log(res);
        localStorage.removeItem("edituserId");
        getBookData();
      })
      .catch((err) => console.log(err));

    setchangeModal(false);
    setShow(false);
  };

  async function DeleteBook(e, i) {
    console.log("DeleteBook index >>>", i);
    localStorage.setItem("deletebookId", JSON.stringify(allBooks[i]._id));
    const deletebookId = JSON.parse(localStorage.getItem("deletebookId"));

    var config = {
      method: "delete",
      url: `http://localhost:3000/books/${deletebookId}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    await axios(config)
      .then((res) => {
        // console.log(res);
        localStorage.removeItem("deletebookId");
        getBookData();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <button className="create-user-btn" onClick={handleShow}>
          + Create Book
        </button>
      </div>
      {/* Table  */}
      <div>
        <table className="table borderless">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author Name</th>
              <th>Publisher</th>
              <th>Publish Year</th>
              <th>Price</th>
              <th>Pages</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{ele.name}</td>
                  <td>{ele.authorName}</td>
                  <td>{ele.publisher}</td>
                  <td>{ele.publishYear}</td>
                  <td>{ele.price}</td>
                  <td>{ele.pages}</td>
                  <td>
                    {ele.category.bookCategory ? ele.category.bookCategory : ""}
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

      {/* Modal  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {changeModal ? "Plaese Updae The Book Data" : "Create Book"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row row-col-1 row-cols-sm-2">
            <div className="col">
              <div>
                <div className="text-black">Name</div>
                <input
                  className={"inp-text"}
                  type="text"
                  value={changeModal ? editBookData.name : createBooksData.name}
                  onChange={(e) => {
                    changeModal
                      ? seteditBookData({
                          ...editBookData,
                          name: e.target.value,
                        })
                      : setcreateBooksData({
                          ...createBooksData,
                          name: e.target.value,
                        });
                  }}
                />
              </div>

              <div>
                <div className="text-black">Author name</div>
                <input
                  className={"inp-text"}
                  type="text"
                  value={
                    changeModal
                      ? editBookData.authorName
                      : createBooksData.authorName
                  }
                  onChange={(e) => {
                    changeModal
                      ? seteditBookData({
                          ...editBookData,
                          authorName: e.target.value,
                        })
                      : setcreateBooksData({
                          ...createBooksData,
                          authorName: e.target.value,
                        });
                  }}
                />
              </div>

              <div>
                <div className="text-black">Publisher</div>
                <input
                  className={"inp-text"}
                  type="text"
                  value={
                    changeModal
                      ? editBookData.publisher
                      : createBooksData.publisher
                  }
                  onChange={(e) => {
                    changeModal
                      ? seteditBookData({
                          ...editBookData,
                          publisher: e.target.value,
                        })
                      : setcreateBooksData({
                          ...createBooksData,
                          publisher: e.target.value,
                        });
                  }}
                />
              </div>

              <div>
                <div className="text-black">Publish Year</div>
                <input
                  className={"inp-text"}
                  type="text"
                  value={
                    changeModal
                      ? editBookData.publishYear
                      : createBooksData.publishYear
                  }
                  onChange={(e) => {
                    changeModal
                      ? seteditBookData({
                          ...editBookData,
                          publishYear: e.target.value,
                        })
                      : setcreateBooksData({
                          ...createBooksData,
                          publishYear: e.target.value,
                        });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div>
                <div className="text-black">Price</div>
                <input
                  className={"inp-text"}
                  type="text"
                  value={
                    changeModal ? editBookData.price : createBooksData.price
                  }
                  onChange={(e) => {
                    changeModal
                      ? seteditBookData({
                          ...editBookData,
                          price: e.target.value,
                        })
                      : setcreateBooksData({
                          ...createBooksData,
                          price: e.target.value,
                        });
                  }}
                />
              </div>

              <div>
                <div className="text-black">Pages</div>
                <input
                  className={"inp-text"}
                  type="text"
                  value={
                    changeModal ? editBookData.pages : createBooksData.pages
                  }
                  onChange={(e) => {
                    changeModal
                      ? seteditBookData({
                          ...editBookData,
                          pages: e.target.value,
                        })
                      : setcreateBooksData({
                          ...createBooksData,
                          pages: e.target.value,
                        });
                  }}
                />
              </div>

              <div>
                <div className="text-black">Book Category</div>
                <select
                  placeholder="Select book category"
                  className="inp-text"
                  onChange={(e) => {
                    changeModal
                      ? seteditBookData({
                          ...editBookData,
                          category: e.target.value,
                        })
                      : setcreateBooksData({
                          ...createBooksData,
                          category: e.target.value,
                        });
                  }}
                >
                  {allBookCategory.map((e, i) => {
                    return (
                      <option key={i} value={e._id}>
                        {e.bookCategory}
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
            onClick={changeModal ? EditSubmitBook : CreateSubmitBook}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBooks;
