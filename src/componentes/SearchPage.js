import React, { useState } from "react";

import Lista from "./Lista";

import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function SearchPage(props) {
  const productos = props.theproducts;
  const [datos, setDatos] = useState(props.theproducts);

  const [filtro, setFiltro] = useState("");

  
  const filtrar = () => {
    let nombre = filtro.toUpperCase().replace(/\s/g, "");

    let filtrados = props.theproducts.filter((item) => {
      return item.title.toUpperCase().replace(/\s/g, "").includes(nombre);
    });

    setDatos(filtrados);
  };





  function categorias() {
    let categorias = productos.map((item) => {
      return item.category;
    });

    let categorias_filtradas = categorias.filter((item, index) => {
      return categorias.indexOf(item) === index;
    });

    return categorias_filtradas.map((item, index) => {
      return <option key={item.index}>{item}</option>;
    });
  }
  const filtraCategoria = () => {
    let categoriaElegida = document.getElementById("selector").value;

    let filtrados = productos.filter((item) => {
      if (categoriaElegida === "All") return productos;
      else return item.category === categoriaElegida;
    });


    let item = props.theproducts.filter((item)=>{
      return item.category===(categoriaElegida)
    })
      
    
    console.log(item)
    setDatos(filtrados);

    
  };

  return (
    <div>
      <div id="formulario">
        <h2 id="catálogo">Aquí irá un navbar</h2>
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

        <Form>
          <Form.Select
            id="selector"
            onChange={(e) => {
              filtraCategoria();
              
            }}
          >
            <option>All</option>
            {categorias()}
          </Form.Select>
        </Form>
      </div>


      <div id="productosresultados">{<Lista theproducts={datos} />}</div>
     
    </div>
  );
}

export default SearchPage;


