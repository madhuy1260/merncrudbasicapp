import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState([]);

  const getUsersData = async () => {
    const resp = await fetch("http://localhost:8000/getData", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();

    if (resp.status === 404 || !data) {
      console.log("error");
    } else {
      setUserData(data);
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
      getUsersData();
    }
  };

  console.log(userData);
  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2">
            <NavLink to="/register">
              <button className="btn btn-primary">Add Data</button>
            </NavLink>
          </div>
          <table class="table mt-5">
            <thead>
              <tr className="table-dark">
                <th scope="col">#ID</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((each, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{each.Name}</td>

                      <td>{each.Email}</td>
                      <td>{each.Work}</td>
                      <td>{each.MobileNumber}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`/view/${each._id}`}>
                          <button className="btn btn-success">
                            <i class="fa-solid fa-eye"></i>
                          </button>
                        </NavLink>

                        <NavLink to={`/edit/${each._id}`}>
                          <button className="btn btn-primary">
                            <i class="fa-solid fa-pen"></i>
                          </button>
                        </NavLink>

                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(each._id)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
