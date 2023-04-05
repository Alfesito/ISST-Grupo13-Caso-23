import React, { useState } from "react";

import ListaRecipe from "./ListaRecipe";
import API from "../../constants/data";

import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function SearchRecipe(props){
    const [filtro, setFiltro] = useState("");
  
    const filtrar = () => {
      if (API.API_connection) {
        props.onButtonClick(filtro);
      }else{
        let nombre = filtro.toUpperCase().replace(/\s/g, "");
        let filtrados = props.theproducts && props.theproducts.filter((item) => {
          return item.recipe.label.toUpperCase().replace(/\s/g, "").includes(nombre);
        });
        setFiltro(filtrados);
        props.onInputChange(filtrados);
      }
    };
  
    const handleInputChange = (event) => {
      setFiltro(event.target.value);
      props.onInputChange(event.target.value);
    };

    const handleSeleccionDiet = (event) => {
      props.onSelectChangeDiet(event.target.value);
    };

    const handleSeleccionHealth = (event) => {
      props.onSelectChangeHealth(event.target.value);
    };

    const handleSeleccionCuisine = (event) => {
      props.onSelectChangeCuisine(event.target.value);
    };
  
    return (
      <div>
        <div id="formulario">
          <Form className="form-inline">
            <input
              type="text"
              placeholder="Producto a buscar"
              id="filtro"
              onChange={handleInputChange}
            ></input>
            <Button
              id="buscador"
              variant="outline-info"
              size="sm"
              onClick={() => filtrar()}
            >
              Buscar
            </Button>
            <div>
            <select className="selectorRecetas" onChange={handleSeleccionDiet}>
              <option value="">Dieta</option>
              <option value="balanced">Equilibrado</option>
              <option value="high-fiber">Alto en fibra</option>
              <option value="high-protein">Alto en proteínas</option>
              <option value="low-carb">Bajo en carbohidratos</option>
              <option value="low-fat">Bajo en grasas</option>
              <option value="low-sodium">Bajo en sodio</option>
            </select>
            <select className="selectorRecetas" onChange={handleSeleccionHealth}>
              <option value="">Salud</option>
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
            <select className="selectorRecetas" onChange={handleSeleccionCuisine}>
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
          </Form>
          
        </div>
        <div id="productosresultados">{<ListaRecipe theproducts={props.theproducts}/>}</div>
      </div>
      
    )
}
export default SearchRecipe;