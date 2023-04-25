import React, { useState, useEffect } from "react";

import Lista from "./Lista";
import API from "../../constants/data";

import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

function SearchPage(props) { // def del componente SearchPage
  const [filtro, setFiltro] = useState(""); // Estado local para almacenar el valor del filtro de búsqueda
 

  const filtrar = () => {
    if (API.API_connection) { // Comprobación de la conexión a la API
      props.onButtonClick(filtro); // Si hay conexión a la API, se llama a la función onButtonClick de las props con el valor del filtro

    }else{
      let nombre = filtro.toUpperCase().replace(/\s/g, ""); // Se convierte el filtro a mayúsculas y se eliminan los espacios en blanco
      let filtrados = props.theproducts.filter((item) => { // Se realiza el filtrado de productos basado en el filtro ingresado
        return item.food.label.toUpperCase().replace(/\s/g, "").includes(nombre);
      });
      setFiltro(filtrados); // Se actualiza el estado local del filtro con los productos filtrados
      props.onInputChange(filtrados); // Se llama a la funcioon onInputChange de las props con los productos filtrados
    }
  };

  const handleInputChange = (event) => { // manejador del evento de cambio en el input de busqueda
    setFiltro(event.target.value); // Se actualiza el estado local del filtro con el valor del input
    props.onInputChange(event.target.value); // Se llama a la función onInputChange de las props con el valor del input
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
            // Se llama a la función handleInputChange cuando hay cambios en el input
          ></input>

          <Button
            id="buscador"
            variant="outline-info"
            size="sm"
            onClick={() => filtrar()}
            // Se llama a la función filtrar() cuando se hace clic en el botón de búsqueda
          >
            Buscar
          </Button>
        </Form>
      </div>
      <div id="productosresultados">{<Lista theproducts={props.theproducts} theparsed={props.theparsed}/>}</div>
    </div>
    
  )
}

export default SearchPage;
