import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from 'react-router-dom';


function ListaRecipe(props) { // declaracion del componente ListaRecipe como una función
  
  const { handleAlergiaRecipe } = useContext(MyContext);

  const handleAñadir = (item) => { // función manejadora de eventos
    handleAlergiaRecipe(item.recipe.label,item.recipe.ingredientLines,item.recipe.healthLabels); // agrega recetas a una lista de alergias DADO un determinado contexto
    handleSubmit(item);
  };

  const [correo, setCorreo] = useState(sessionStorage.getItem('correo'));
  const navigate = useNavigate();

  const handleSubmit = async (item) => {
    await fetch(`/api/añadir/ingestas/${correo}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "fecha":new Date(), "correo": correo, "comida": item.recipe.label, "kcal": item.recipe.calories, "proteina": Math.round(item.recipe.totalNutrients.PROCNT.quantity), 
        "grasa": Math.round(item.recipe.totalNutrients.FAT.quantity), "carb": Math.round(item.recipe.totalNutrients.CHOCDF.quantity), "fibra": Math.round(item.recipe.totalNutrients.FIBTG.quantity) })
      })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/recomendaciones");
        } else {
          alert('Algo ha salido mal')
        }
        console.log(res)
      })
      .catch(function (res) { console.log(res) })
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
              > 
              {/* crear vista de la tarjeta con su imagen, titulo y texto correspondiente */}
                <Card.Img variant="top" src={item.recipe.image} />
                <Card.Body>
                  <Card.Title>{item.recipe.label}</Card.Title>
                  <Card.Text>{item.recipe.source}</Card.Text>

                  <Link to={"/recipe/" + id}>  
                  {/* anadir vista de la receta */}
                    <Button variant="info">Ver</Button>
                  </Link>
                  <Button
                    variant="success"
                    onClick={() =>
                      handleAñadir(item)
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
