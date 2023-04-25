import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import Naavbar from "./Naavbar";

function Perfil() {
  const { correo } = useContext(MyContext);
  const [perfil, setPerfil] = useState([]);
  const [cambiar, setCambiar] = useState(false);
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [sexo, setSexo] = useState("");
  const [alergia, setAlergia] = useState("");
  const [health, setHealth] = useState("");
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");

  useEffect(() => {
    getDatosUsuario();
  }, []);

  async function getDatosUsuario() {
    await fetch(`/api/perfil/${correo}`)
      .then(response => response.json())
      .then(data => setPerfil(data) || console.log(data))
      .catch(error => console.error(error));
  }

  function modificarPerfil() {
    setAlergia(perfil.indeseado)
    setAltura(perfil.altura)
    setCuisine(perfil.cocina_fav)
    setSexo(perfil.sexo)
    setEdad(perfil.edad)
    setHealth(perfil.alergia)
    setDiet(perfil.dieta)
    setPeso(perfil.peso)
    setCambiar(true);
  }

  async function guardarCambios(){
    await fetch(`/api/modificar/perfil/${correo}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
              "correo": correo, "edad": edad, "peso": peso, "altura":
                altura, "indeseado": alergia, "alergia": health, "dieta": diet,
              "cocina_fav": cuisine, "sexo": sexo
            }),
          })
          .then(getDatosUsuario)
          .catch(error => console.error(error));
  }

  function verificarCambios() {
    if (edad !== "" || peso !== "" || altura !== "") {
      if (isNaN(parseInt(edad) && edad !== "")) {
        alert("La edad debe ser un número entero");
        return;
      } else if (isNaN(parseFloat(peso)) && peso !== "") {
        alert("El peso debe ser un número decimal");
        return;
      } else if (isNaN(parseInt(altura)) && altura !== "") {
        alert("La altura debe ser un número decimal");
        return;
      } else {
        guardarCambios();
      }
    }else{
      guardarCambios();
    }
    setCambiar(false);
  }

  const handleEdad = (event) => {
    setEdad(event.target.value);
  };
  const handlePeso = (event) => {
    setPeso(event.target.value);
  };
  const handleAltura = (event) => {
    setAltura(event.target.value);
  };
  const handleAlergia = (event) => {
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
  const handleSeleccionSexo = (event) => {
    setSexo(event.target.value);
  };

  return (
    <div>
      <Naavbar />
      <h1><b>Nombre de usuario:</b></h1>
      {cambiar ?
        <div>
          <input
            type="text"
            id="edad"
            placeholder="Escriba su edad"
            value={edad}
            onChange={handleEdad}
          ></input>
          <input
            type="text"
            id="weight"
            placeholder="Peso en Kg"
            value={peso}
            onChange={handlePeso}
          ></input>
          <input
            type="text"
            id="height"
            placeholder="Altura en cm"
            value={altura}
            onChange={handleAltura}
          ></input>
          <input
            type="text"
            id="producto no deseado"
            placeholder="Introduzca producto no deseado"
            value={alergia}
            onChange={handleAlergia}
          ></input>

          <div>
            <select defaultValue={sexo} onChange={handleSeleccionSexo} value={sexo}>
              <option value="">Sexo</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>

          <div>
            <select defaultValue={diet} onChange={handleSeleccionDiet} value={diet}>
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
          <div>
            <select defaultValue={cuisine} onChange={handleSeleccionCuisine} value={cuisine}>
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
          <div>
            <select defaultValue={health} onChange={handleSeleccionHealth} value={health}>
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
          {/* <input value="Guardar" onClick={guardarCambios}>Guardar</input> */}
          <button onClick={verificarCambios}>Guardar</button>
        </div>
        :
        <div>
          <p>Edad:{perfil.edad}</p>
          <p>Altura:{perfil.altura}</p>
          <p>Peso:{perfil.peso}</p>
          <p>Sexo:{perfil.sexo}</p>
          <p>Producto no deseado:{perfil.indeseado}</p>
          <p>Estilo de dieta:{perfil.dieta}</p>
          <p>Tipo de cocina:{perfil.cocina_fav}</p>
          <p>Alergias:{perfil.alergia}</p>
          <button onClick={modificarPerfil}>Modificar perfil</button>
        </div>

      }
      {/* 
      <Link to={"/hoy"}>
        <Button variant="danger">Volver</Button>
      </Link> */}

    </div>
  );
} export default Perfil;
