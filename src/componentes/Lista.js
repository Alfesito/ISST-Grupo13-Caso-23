import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link} from "react-router-dom";

function Lista(props) {
  return (
    <div>
      <Row lg={4}>
        {props.theproducts.map((item) => {
          let id = item.food.foodId
          return (
            <Card
              className="unproducto"
              key={item.food.foodId}
              style={{ width: "20rem" }}
            >
              <Card.Img variant="top" src={item.food.image} />
              <Card.Body>
                <Card.Title>{item.food.label}</Card.Title>
                <Card.Text>{item.food.knownAs}</Card.Text>

                <Link to={"/products/" + id}>
                  <Button variant="info">Ver</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </div>
  );
}

export default Lista;
