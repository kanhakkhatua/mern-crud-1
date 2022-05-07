import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function UserBooks() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [userBookData, setUserBookData] = useState([]);
  // console.log(userBookData);
  const [allBooks, setAllBooks] = useState([]);
  const [bookData, setBookData] = useState({
    book: [],
  });
  // console.log(bookData);

  var options = allBooks.map((e) => ({ value: e._id, label: e.name }));

  const handleChange = (value) => {
    var arr = value.map((e) => e.value);
    setBookData({ ...bookData, book: arr });
  };

  const handleSubmit = async () => {
    console.log("bookData >>>", bookData);
    var config = {
      method: "put",
      url: `http://localhost:3000/users/${token.data._id}`,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: bookData,
    };

    await axios(config)
      .then((res) => {
        // console.log(res);
        getUserBookData();
      })
      .catch((err) => console.log(err));
    setShow(false);
  };

  async function DeleteBook(e, index) {
    const filterData = userBookData.filter((e, i) => i != index);
    const mapData = filterData.map((e) => e._id);
    // console.log(mapData);
    const mainData = {
      books: mapData,
    };
    // console.log(mainData);

    var config = {
      method: "put",
      url: `http://localhost:3000/users/books/${token.data._id}`,
      data: mainData,
    };
    await axios(config)
      .then((res) => {
        // console.log(res);

        getUserBookData();
      })
      .catch((err) => console.log(err));
  }

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
  const getUserBookData = () => {
    if (token.token) {
      axios
        .get(`http://localhost:3000/users?id=${token.data._id}`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          // console.log(res.data.books);
          setUserBookData(res.data.books);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Authorization token not avelible");
    }
  };

  useEffect(() => {
    getBookData();
    getUserBookData();
  }, []);

  return (
    <div>
      <div style={{ paddingTop: "0.7rem", paddingLeft: "0.7rem" }}>
        <button className="create-user-btn" onClick={handleShow}>
          + Add Book{" "}
        </button>
      </div>
      <div style={{ padding: "2rem" }}>
        <table className="table borderless">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author Name</th>
              <th>Publisher</th>
              <th>Publish Year</th>
              <th>Price</th>
              <th>Pages</th>
              {/* <th>Category</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userBookData.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{ele.name}</td>
                  <td>{ele.authorName}</td>
                  <td>{ele.publisher}</td>
                  <td>{ele.publishYear}</td>
                  <td>{ele.price}</td>
                  <td>{ele.pages}</td>
                  {/* <td>
                    {ele.category.bookCategory ? ele.category.bookCategory : ""}
                  </td> */}
                  <td>
                    <button
                      className="edit-user-btn"
                      style={{ marginLeft: "3px" }}
                      onClick={(e) => DeleteBook(e, i)}
                    >
                      <i className="fa-solid fa-xmark"></i>
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
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ marginTop: "0.5rem" }}>
              <div className="text-black">Select Your Favourite Books </div>
              <Select
                placeholder="Select Gender"
                options={options}
                isMulti
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserBooks;
