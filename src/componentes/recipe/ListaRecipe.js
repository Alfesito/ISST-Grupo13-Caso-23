import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";


function ListaRecipe(props) { // declaracion del componente ListaRecipe como una función
  
  const { handleAlergiaRecipe } = useContext(MyContext);

  const handleAñadir = (name, ingredients,salud) => { // función manejadora de eventos
    
    handleAlergiaRecipe(name, ingredients,salud); // agrega recetas a una lista de alergias DADO un determinado contexto
  };
  return (
    <div>
      <Row lg={4}>
        {props.theproducts &&
          props.theproducts.map((item) => {
            let id = item.recipe.label;
            return (
              <Card
                className="unproducto"
                key={item.recipe.uri}
                style={{ width: "20rem" }}
              > // crear vista de la tarjeta con su imagen, titulo y texto correspondiente
                <Card.Img variant="top" src={item.recipe.image} />
                <Card.Body>
                  <Card.Title>{item.recipe.label}</Card.Title>
                  <Card.Text>{item.recipe.source}</Card.Text>

                  <Link to={"/recipe/" + id}> // anadir vista de la receta
                    <Button variant="info">Ver</Button>
                  </Link>
                  <Button
                    variant="success"
                    onClick={() =>
                      handleAñadir(
                        item.recipe.label,
                        item.recipe.ingredientLines,
                        item.recipe.healthLabels

                      )
                    }
                    style={{ float: "right" }}
                  >
                    Añadir
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </Row>
    </div>
  );
}
export default ListaRecipe;
