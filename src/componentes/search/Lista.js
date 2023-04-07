import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link} from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import Swal from 'sweetalert2'

function Lista(props) {


  const{alergia}=useContext(MyContext)

  const handleAlergia=()=>{
    Swal.fire({
      title: 'Este alimento tiene tu alergia',
        text: '¿Quieres seguir añadiendo este alimento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,añadir'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelar',
          'success'
        )
      }
    })
  }
  

  return (
    <div>
      <Row lg={1}>
      {props.theparsed && props.theparsed.map((item) => {
          let id = item.food.foodId
          return (
            <Card
              className="productobuscado"
              key={item.food.foodId}
              style={{ width: "20rem" }}
            >
              <Card.Img variant="top" src={item.food.image} />
              <Card.Body>
                <Card.Title>{item.food.label}</Card.Title>
                <Card.Text>{item.quantity ? item.quantity+'g' : '100g'}</Card.Text>

                <Link to={"/products/" + id}>
                  <Button variant="info">Ver</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
      <div className="unproducto"> {props.theproducts.length > 0 && props.theparsed.length !== 0 ? 'Relacionado:' : ''}</div>
      <Row lg={4}>
        {props.theproducts && props.theproducts.map((item) => {
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
                <Card.Text>{item.food.category}</Card.Text>

                <Link to={"/products/" + id}>
                  <Button variant="info">Ver</Button>
                </Link>
                <Button variant="success" onClick={handleAlergia} style={{ float: "right"}} >Añadir</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </div>
  );
}

export default Lista;
