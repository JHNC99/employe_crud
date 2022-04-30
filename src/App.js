import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from "sweetalert";
function App() {
  /* 
    Get data from the server and display it in the browser
  */
  const [data, setData] = useState([]);
  const getEmploye = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/employes');
    const data = await response.json();
    setData(data);
  };

  /* Delete*/
  const deleteEmploye = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/employes/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data) {
        swal({
          icon: "success",
          title: "Error!",
          text: "Employe added successfully",
          timer: 2000,
        });
        getEmploye();
      }

    }
    catch (error) {

    }
  }


  useEffect(() => {
    getEmploye();
  }, []);

  return (
    <>
      <div className='container'>
        <h1 className='text-center'>CRUD EMPLOYE</h1>
        <Link to="/add" className='btn btn-success'>Add new employe</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>
                      <Link to={`/edit/${item.id}`} className='btn btn-primary'>Edit</Link>
                      <button className='btn btn-danger' onClick={() => deleteEmploye(item.id)}>Eliminar</button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
