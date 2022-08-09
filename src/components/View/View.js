import React from "react";
import { useEffect, useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import { maxWidth } from "@mui/system";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function View() {
  const [userSingleData, setUserSingleData] = useState({});
  const { id } = useParams("");
  const navigate = useNavigate("");

  const getUsersData = async () => {
    const resp = await fetch(`http://localhost:8000/getData/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();

    if (resp.status === 404 || !data) {
      console.log("error");
    } else {
      setUserSingleData(data);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const deleteUser = async (id) => {
    const resp = await fetch(`http://localhost:8000/deleteUser/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const deletedData = await resp.json();
    console.log(deletedData);

    if (resp.status === 422 || !deletedData) {
      alert("error");
    } else {
      alert("User deleted Successfully");
      navigate("/");
    }
  };

  console.log(userSingleData);

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 800 }}>Welcome {userSingleData.Name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="d-flex justify-content-end">
            <NavLink to={`/edit/${id}`}>
              <button className="btn btn-primary ">
                <ModeEditOutlineIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger mx-3"
              onClick={() => deleteUser(userSingleData._id)}
            >
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-md-6 col-lg-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="Profile" />
              <p className="mt-3">
                Name :{" "}
                <span style={{ fontWeight: 400 }}>{userSingleData.Name}</span>
              </p>
              <p className="mt-3">
                Age :{" "}
                <span style={{ fontWeight: 400 }}>{userSingleData.Age}</span>
              </p>
              <p>
                <EmailIcon /> Email : <span>{userSingleData.Email}</span>
              </p>
              <p>
                <WorkIcon /> Occupation : <span>{userSingleData.Work}</span>
              </p>
            </div>
            <div className="right_view col-md-6 col-lg-6 col-12">
              <p className="mt-5">
                <PhoneIphoneIcon /> Mobile :{" "}
                <span>{userSingleData.MobileNumber}</span>
              </p>
              <p className="mt-4">
                <LocationOnIcon /> Location :{" "}
                <span>{userSingleData.Address}</span>
              </p>
              <p className="mt-4">
                Description : <span>{userSingleData.Description}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default View;
