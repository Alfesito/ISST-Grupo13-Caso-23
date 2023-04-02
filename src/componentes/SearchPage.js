import React, { useState } from "react";

import Lista from "./Lista";
import API from "../constants/data";

import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchPage(props) {
  const [datos, setDatos] = useState(props.theproducts);
  const [filtro, setFiltro] = useState("");
  
  const filtrar = () => {
    if (!API.API_connection) {
      let nombre = filtro.toUpperCase().replace(/\s/g, "");
      let filtrados = props.theproducts.filter((item) => {
        return item.food.label.toUpperCase().replace(/\s/g, "").includes(nombre);
      });
      setDatos(filtrados);
    }
    
  };


  return (
    <div>
      <div id="formulario">
        <Form className="form-inline">
          <input
            type="text"
            placeholder="Producto a buscar"
            id="filtro"
            onChange={(e) => setFiltro(e.target.value)}
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


      <div id="productosresultados">{<Lista theproducts={datos} />}</div>
     
    </div>
    
  )
}

export default SearchPage;


