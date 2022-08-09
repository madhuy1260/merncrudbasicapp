import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

function Register() {
  const [userSingleData, setUserSingleData] = useState({});
  const { id } = useParams("");
  const navigate = useNavigate("");

  const getUsersData = async () => {
    const resp = await fetch(
      `https://mernstack-crud-userapp.herokuapp.com/getData/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await resp.json();

    if (resp.status === 404 || !data) {
      console.log("error");
    } else {
      setUserSingleData(data);
    }
  };

  useEffect(() => {
    getUsersData();
  });

  console.log(userSingleData);

  const updateDetails = async (e) => {
    e.preventDefault();
    const { Name, Email, Work, Address, MobileNumber, Description, Age } =
      userSingleData;
    const respupdate = await fetch(
      `https://mernstack-crud-userapp.herokuapp.com/updateUser/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name,
          Email,
          Work,
          Address,
          MobileNumber,
          Description,
          Age,
        }),
      }
    );
    const updatedData = await respupdate.json();
    console.log(updatedData);

    if (respupdate.status === 404 || !updatedData) {
      alert("Please fill the data to update");
    } else {
      alert("Data has been Updated Successfully");
      setUserSingleData({
        Name: "",
        Email: "",
        Age: "",
        MobileNumber: "",
        Work: "",
        Address: "",
        Description: "",
      });
      navigate("/");
    }
  };

  const changeInput = (event) => {
    const { name, value } = event.target;
    setUserSingleData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <Form className="mt-5" onSubmit={(e) => updateDetails(e)}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Your Name"
                name="Name"
                value={userSingleData.Name}
                onChange={(e) => changeInput(e)}
              />
            </Form.Group>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="Email"
                value={userSingleData.Email}
                onChange={(e) => changeInput(e)}
              />
            </Form.Group>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="age"
                placeholder="Enter age"
                name="Age"
                value={userSingleData.Age}
                onChange={(e) => changeInput(e)}
              />
            </Form.Group>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="mobileNumber"
                placeholder="Enter Mobile Number"
                name="MobileNumber"
                value={userSingleData.MobileNumber}
                onChange={(e) => changeInput(e)}
              />
            </Form.Group>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicWork">
              <Form.Label>Work</Form.Label>
              <Form.Control
                type="work"
                placeholder="Enter Work"
                name="Work"
                value={userSingleData.Work}
                onChange={(e) => changeInput(e)}
              />
            </Form.Group>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                placeholder="Enter Your Address"
                name="Address"
                value={userSingleData.Address}
                onChange={(e) => changeInput(e)}
              />
            </Form.Group>
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <Form.Group className="mb-3" controlId="formBasicWorkDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                as="textarea"
                rows={5}
                cols={30}
                name="Description"
                value={userSingleData.Description}
                onChange={(e) => changeInput(e)}
              />
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
