import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

function Lista(props) {
  const { handleAlergiaProd } = useContext(MyContext);

  const handleAñadir = (product) => {
    handleAlergiaProd(product);
  };
  return (
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
                    onClick={() => handleAñadir(item.food.label)}
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
