import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import iconAvatar from "../images/iconAvatar.png"

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const { alergia, setAlergia } = useContext(MyContext);
  const { health, setHealth } = useContext(MyContext);
  const { diet, setDiet } = useContext(MyContext);
  const { cuisine, setCuisine } = useContext(MyContext);
  const [correct, setCorrect] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (username === "" || contraseña === "" || correo === "") {
      setCorrect(false)
      alert("Campos obligatorios nulos")
    } else {
      if (correct) {
        await handleSubmit(e)
      } else {
        setCorrect(true)
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/guardar",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "username": username, "contrasena": contraseña, "correo": correo, "edad": parseInt(edad), "peso": peso, "altura": altura, "indeseado": alergia, "alergia": health, "dieta": diet, "cocina_fav": cuisine })
      })
      .then(function (res) {
        if (res.status === 200) {
          alert("Gracias por registrarte")
          window.location.href = '/';
        }else{
          alert('Algo ha salido mal')
          setCorrect(false)
        }
        console.log(res)
      })
      .catch(function (res) { console.log(res) })
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleContraseña = (event) => {
    setContraseña(event.target.value);
  };
  const handleCorreo = (event) => {
    setCorreo(event.target.value);
  };
  const handleEdad = (event) => {
    setEdad(event.target.value);
  };
  const handlePeso = (event) => {
    setPeso(event.target.value);
  };
  const handleAltura = (event) => {
    setAltura(event.target.value);
  };
  const handleInputChange = (event) => {
    setAlergia(event.target.value)
  }
  const handleSeleccionHealth = (event) => {
    setHealth(event.target.value);
  };
  const handleSeleccionCuisine = (event) => {
    setCuisine(event.target.value);
  };
  const handleSeleccionDiet = (event) => {
    setDiet(event.target.value);
  };

  return (
    <div>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 class="active"> Registrate</h2>

          {/* Icon */}
          <div class="fadeIn first">
            <img
              src={iconAvatar}
              id="icon"
              alt="imagen que queramos"
            />
          </div>

          {/* Sign Form */}
          <form >
            <input
              type="text"
              id="username"
              class="fadeIn second"
              placeholder="Escriba su nombre de usuario"
              value={username}
              onChange={handleUsername}
            ></input>
            <input
              type="text"
              id="email"
              class="fadeIn third"
              placeholder="Escriba su correo electrónico"
              value={correo}
              onChange={handleCorreo}
            ></input>
            <input
              type="text"
              id="password"
              class="fadeIn fourth"
              placeholder="Escriba su contraseña"
              value={contraseña}
              onChange={handleContraseña}
            ></input>
            <input
              type="text"
              id="edad"
              class="fadeIn sixth"
              placeholder="Escriba su edad"
              value={edad}
              onChange={handleEdad}
            ></input>
            <input
              type="text"
              id="weight"
              class="fadeIn seventh"
              placeholder="Registre su peso en Kg"
              value={peso}
              onChange={handlePeso}
            ></input>
            <input
              type="text"
              id="height"
              class="fadeIn eighth"
              placeholder="Registre su altura en cm"
              value={altura}
              onChange={handleAltura}
            ></input>
            <input
              type="text"
              id="producto no deseado"
              class="fadeIn nineth"
              placeholder="Introduzca producto no deseado"
              value={alergia}
              onChange={handleInputChange}
            ></input>

            <div class="fadeIn nineth">
              <select className="selectorRecetas" onChange={handleSeleccionDiet} value={diet}>
                <option value="">Estilo de dieta</option>
                <option value="balanced">Equilibrado</option>
                <option value="high-fiber">Alto en fibra</option>
                <option value="high-protein">Alto en proteínas</option>
                <option value="low-carb">Bajo en carbohidratos</option>
                <option value="low-fat">Bajo en grasas</option>
                <option value="low-sodium">Bajo en sodio</option>
              </select>
            </div>

            {/* Dropdown */}
            <div class="fadeIn tenth">
              <select className="selectorRecetas" onChange={handleSeleccionCuisine} value={cuisine}>
                <option value="cuisineType">Tipo de Cocina</option>
                <option value="American">Americana</option>
                <option value="Asian">Asiática</option>
                <option value="British">Británica</option>
                <option value="Caribbean">Caribeña</option>
                <option value="Central Europe">Europa Central</option>
                <option value="Chinese">China</option>
                <option value="Eastern Europe">Europa del Este</option>
                <option value="French">Francesa</option>
                <option value="Indian">India</option>
                <option value="Italian">Italiana</option>
                <option value="Japanese">Japonesa</option>
                <option value="Kosher">Cocina Kosher</option>
                <option value="Mediterranean">Mediterránea</option>
                <option value="Mexican">Mexicana</option>
                <option value="Middle Eastern">Medio Oriente</option>
                <option value="Nordic">Nórdica</option>
                <option value="South American">Sudamericana</option>
                <option value="South East Asian">Sudeste Asiático</option>
              </select>
            </div>
            <div class="fadeIn eleventh">
              <select className="selectorRecetas" onChange={handleSeleccionHealth} value={health}>
                <option value="">Alergias</option>
                <option value="alcohol-free">Sin alcohol</option>
                <option value="celery-free">Sin apio</option>
                <option value="crustacean-free">Sin crustáceos</option>
                <option value="dairy-free">Sin lácteos</option>
                <option value="egg-free">Sin huevos</option>
                <option value="fish-free">Sin pescado</option>
                <option value="gluten-free">Sin gluten</option>
                <option value="low-fat-abs">Bajo en grasas saturadas</option>
                <option value="low-potassium">Bajo en potasio</option>
                <option value="low-sugar">Bajo en azúcar</option>
                <option value="mollusk-free">Sin moluscos</option>
                <option value="mustard-free">Sin mostaza</option>
                <option value="peanut-free">Sin cacahuetes</option>
                <option value="pork-free">Sin cerdo</option>
                <option value="red-meat-free">Sin carne roja</option>
                <option value="vegan">Vegano</option>
                <option value="vegetarian">Vegetariano</option>
              </select>
            </div>
            {correct ? <Link to="/login"><button type="submit" value="Confirmar" class="btn btn-success" onClick={handleVerify}>Confirmar</button></Link> :
              <button type="submit" class="btn btn-info" value="Regístrate" onClick={handleVerify}>Regístrate</button>}
              {/* <input type="submit" class="fadeIn x" value="Regístrate"></input> */}
          </form>
        </div>
      </div>
      <div>
        <Link to="/">
            <button id="volver" class="btn btn-danger">Volver</button>
        </Link>
      </div>
    </div>
  );
}
