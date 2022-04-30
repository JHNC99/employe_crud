import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
const EditForm = () => {
  const { id } = useParams();
  const [employe, setEmploye] = useState({
    name: "",
    lastname: "",
    address: "",
    email: "",
  });
  const getEmployeForId = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/employes/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setEmploye(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let newEmploye = { ...employe, [e.target.name]: e.target.value };
    setEmploye(newEmploye);
  };

  const updateEmploye = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/employes/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employe),
      });
      let data = await response.json();

      if (data) {
        swal({
          icon: "success",
          title: "Success!",
          text: "Employe added successfully",
          timer: 2000,
        });
        window.location.href = "/";
      }
    } catch (error) {
      swal({
        title: "Error!",
        text: "Employe not added,email already exist",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  useEffect(() => {
    getEmployeForId();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container" onSubmit={updateEmploye}>
      <h1 className="text-center">Update employe</h1>
      <form className="w-50 m-auto">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">First name</label>
          <input
            type="name"
            name="name"
            value={employe.name}
            className="form-control"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Last name</label>
          <input
            type="lastname"
            name="lastname"
            value={employe.lastname}
            className="form-control"
            placeholder="Enter lastname"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Address</label>
          <input
            type="address"
            name="address"
            value={employe.address}
            className="form-control"
            placeholder="Enter address"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            value={employe.email}
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-2">
          <input
            type="submit"
            className="btn btn-success w-100"
            value="Send new Employe"
          />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
