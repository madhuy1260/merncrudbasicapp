import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register() {
  const [inputValues, setInputValues] = useState({
    Name: "",
    Email: "",
    Age: "",
    MobileNumber: "",
    Work: "",
    Address: "",
    Description: "",
  });

  const navigate = useNavigate("");

  const saveDetails = async (e) => {
    e.preventDefault();
    const { Name, Email, Age, MobileNumber, Work, Address, Description } =
      inputValues;
    const res = await fetch(
      "https://mernstack-crud-userapp.herokuapp.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          Email,
          Age,
          MobileNumber,
          Work,
          Address,
          Description,
        }),
      }
    );
    const resData = await res.json();
    console.log(resData);

    if (res.status === 404 || !resData) {
      alert("error");
      console.log("error");
    } else {
      alert("Data has been saved Successfully");
      setInputValues({
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
    setInputValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <Form className="mt-5" onSubmit={(e) => saveDetails(e)}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Your Name"
                name="Name"
                value={inputValues.Name}
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
                value={inputValues.Email}
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
                value={inputValues.Age}
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
                value={inputValues.MobileNumber}
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
                value={inputValues.Work}
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
                value={inputValues.Address}
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
                value={inputValues.Description}
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
