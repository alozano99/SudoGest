import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const URL = "";
function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [rol, setRol] = useState("user");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + "/user");
      console.log("Dades rebudes:", response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const postData = async () => {
    try {
      const response = await axios.post(URL + "/user", {
        name: inputValue,
        rol: rol
      });
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };


  const dbinit = async () => {
    try {
      const response = await axios.post(URL + "/dbinit");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const tbinit = async () => {
    try {
      const response = await axios.post(URL + "/tbinit");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Panel de gestión</h1>
      <input name="nombre" placeholder="Nombre del usuario" onChange={handleChange}/>
      <br />
      <br />
      <input name="rol" placeholder="Rol (admin/user)" value={rol} onChange={(e) => setRol(e.target.value)}/>
      <br />
      <br />

      <button onClick={postData}>Guardar</button> <br />
      <br />
      <button style={{ backgroundColor: "red", color: "white" }} onClick={dbinit}>
        Inicializar base de datos
      </button>
      <br />
      <br />
      <button style={{ backgroundColor: "orange", color: "black" }} onClick={tbinit}>
        Crear tabla de usuarios
      </button>
      <br />
      <hr />
      <h2>Lista de usuarios</h2>
      <center>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
	      <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
		<td>{user.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default App;
