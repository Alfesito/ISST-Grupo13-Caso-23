import React, { useState } from "react";

import Lista from "./Lista";
import API from "../../constants/data";

import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function SearchPage(props) {
  const [filtro, setFiltro] = useState("");
  
  const filtrar = () => {
    if (API.API_connection) {
      props.onButtonClick(filtro);

    }else{
      let nombre = filtro.toUpperCase().replace(/\s/g, "");
      let filtrados = props.theproducts.filter((item) => {
        return item.food.label.toUpperCase().replace(/\s/g, "").includes(nombre);
      });
      setFiltro(filtrados);
      props.onInputChange(filtrados);
    }
  };

  const handleInputChange = (event) => {
    setFiltro(event.target.value);
    props.onInputChange(event.target.value);
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
        </Form>
      </div>
      <div id="productosresultados">{<Lista theproducts={props.theproducts} theparsed={props.theparsed}/>}</div>
    </div>
    
  )
}

export default SearchPage;


