import React, { useContext, useState, useEffect } from "react";

import ListaRecipe from "./ListaRecipe";
import API from "../../constants/data";

import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { MyContext } from "../../context/MyContext";

function SearchRecipe(props){ // manejar la busqueda y los filtros de recetas
    const [filtro, setFiltro] = useState("");
    const {health} = useContext(MyContext);
    const {diet} = useContext(MyContext);
    const {cuisine} = useContext(MyContext);
  
    const filtrar = () => { // Si la conexión API está disponible, la función llama al evento onButtonClick para obtener los resultados de búsqueda a través de la API. Si la conexión API no está disponible, la función filtra los productos por su nombre y 
      //luego llama al evento onInputChange para actualizar los resultados de búsqueda en la página.
      if (API.API_connection) { // obtener los resultados de búsqueda a través de la API
        props.onButtonClick(filtro);
      }else{
        console.log("Sin conexion de la API")
      }
    };
    
    const handleInputChange = (event) => { // manejar los cambios en el campo de entrada de texto
      setFiltro(event.target.value);
      props.onInputChange(event.target.value);
    };

    const handleSeleccionDiet = (event) => { // manejar los cambios en el selector de dieta
      props.onSelectChangeDiet(event.target.value);
    };

    const handleSeleccionHealth = (event) => { // manejar los cambios en el selector de salud
      props.onSelectChangeHealth(event.target.value);
    };

    const handleSeleccionCuisine = (event) => { // manejar los cambios en el selector de tipo de cocina
      props.onSelectChangeCuisine(event.target.value);
    };
  
    return ( // devuelve un componente formulario con un campo de entrada de texto y tres selectores
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
            <select className="selectorRecetas" onChange={handleSeleccionDiet} defaultValue={diet}>
              <option value="">Dieta</option>
              <option value="balanced">Equilibrado</option>
              <option value="high-fiber">Alto en fibra</option>
              <option value="high-protein">Alto en proteínas</option>
              <option value="low-carb">Bajo en carbohidratos</option>
              <option value="low-fat">Bajo en grasas</option>
              <option value="low-sodium">Bajo en sodio</option>
            </select>
            <select className="selectorRecetas" onChange={handleSeleccionHealth} defaultValue={health}>
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
            <select className="selectorRecetas" onChange={handleSeleccionCuisine} defaultValue={cuisine}>
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
         {/* renderizado del componente de la lista de recetas */}
        <div id="productosresultados">{<ListaRecipe theproducts={props.theproducts}/>}</div>
      </div>
      
    )
}
export default SearchRecipe;