import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from 'react-router-dom';

function Lista(props) { // Devuelve una lista de productos
  const { handleAlergiaProd } = useContext(MyContext);
  const { correo } = useContext(MyContext);
  const navigate = useNavigate();

  // Cantidad de producto utilizada (por defecto 100g)
  let qu =
    props.theparsed.length > 0 && props.theparsed[0].quantity
      ? props.theparsed[0].quantity
      : 100;

  const handleAñadir = (item) => { // manejar el evento de annadir un producto a la lista de alergias personalizada
    handleAlergiaProd(item.food.label);
    handleSubmit(item);
  };

  const handleSubmit = async (item) => {
    await fetch(`/api/añadir/ingestas/${correo}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"fecha":new Date(), "correo": correo, "comida": item.food.label, "kcal": (item.food.nutrients.ENERC_KCAL * qu) / 100, "proteina": (item.food.nutrients.PROCNT * qu) / 100, 
        "grasa": (item.food.nutrients.FAT * qu) / 100, "carb": (item.food.nutrients.CHOCDF * qu) / 100, "fibra": (item.food.nutrients.FIBTG * qu) / 10 })
      })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/alimentacion");
        } else {
          alert('Algo ha salido mal')
        }
        console.log(res)
      })
      .catch(function (res) { console.log(res) })
  };
  return (
    //  Renderizado de la lista de productos
    <div>
      <Row lg={1}>
        {props.theparsed &&
          props.theparsed.map((item) => {
            let id = item.food.foodId;
            return (
              <Card
                className="productobuscado"
                key={item.food.foodId}
                style={{ width: "20rem" }}
              >
                <Card.Img variant="top" src={item.food.image} />
                <Card.Body>
                  <Card.Title>{item.food.label}</Card.Title>
                  <Card.Text>
                    {item.quantity ? item.quantity + "g" : "100g"}
                  </Card.Text>

                  <Link to={"/products/" + id}>
                    <Button variant="info">Ver</Button>
                  </Link>
                  <Button
                    variant="success"
                    onClick={() => handleAñadir(item)}
                    style={{ float: "right" }}
                  >
                    Añadir
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </Row>
      <div className="unproducto">
        {" "}
        {props.theproducts.length > 0 && props.theparsed.length !== 0
          ? "Relacionado:"
          : ""}
      </div>
      <Row lg={4}>
        {props.theproducts &&
          props.theproducts.map((item) => {
            let id = item.food.foodId;

            return (
              <Card
                className="unproducto"
                key={item.food.foodId}
                style={{ width: "20rem" }}
              >
                <Card.Img variant="top" src={item.food.image} />
                <Card.Body>
                  <Card.Title>{item.food.label}</Card.Title>
                  <Card.Text>{item.food.category}</Card.Text>

                  <Link to={"/products/" + id}>
                    <Button variant="info">Ver</Button>
                  </Link>
                  <Button
                    variant="success"
                    onClick={() => handleAñadir(item)}
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

export default Lista;
