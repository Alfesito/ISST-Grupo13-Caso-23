import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useContext } from "react";
import { MyContext } from "../context/MyContext";



import iconAvatar from "../iconAvatar.png"

export default function SignIn() {
  
  const { setAlergia } = useContext(MyContext);
  const{ setHealth }= useContext(MyContext);
  const {setDiet} = useContext(MyContext);
  const {setCuisine} = useContext(MyContext);


  const handleInputChange= (e)=>{
    setAlergia(e)
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
          <h2 class="active"> Sign in</h2>

          {/* Icon */}
          <div class="fadeIn first">
            <img
              src={iconAvatar}
              id="icon"
              alt="imagen que queramos"
            />
          </div>

          {/* Sign Form */}
          <form>
            <input
              type="text"
              id="username"
              class="fadeIn second"
              placeholder="Escriba su nombre de usuario"
            ></input>
            <input
              type="text"
              id="password"
              class="fadeIn third"
              placeholder="Escriba su contraseña"
            ></input>
            <input
              type="text"
              id="repassword"
              class="fadeIn third"
              placeholder="Repita su contraseña"
            ></input>
            
            <input
              type="text"
              id="producto no deseado"
              class="fadeIn fourth"
              placeholder="Introduzca producto no deseado"
              onChange={(e)=>handleInputChange(e.target.value)}
            ></input>
            <div class="fadeIn fifth">
            <select className="selectorRecetas" onChange={handleSeleccionDiet} >
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
            <div class="fadeIn sixth">
              <select className="selectorRecetas" onChange={handleSeleccionCuisine} >
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
            <div class="fadeIn sixth">
            <select className="selectorRecetas" onChange={handleSeleccionHealth}>
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

            <Link to="/navbar">
              <input type="submit" class="fadeIn x" value="Sign In"></input>
            </Link>
          </form>

          {/* Remind Passowrd  */}
          <div id="formFooter">
            <lergia class="underlineHover" href="#">
              Forgot Password?
            </lergia>
          </div>
        </div>
      </div>
      <div>
        <Link to="/navbar">
          <Button id="volver" variant="danger">
            {" "}
            Volver{" "}
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
}
