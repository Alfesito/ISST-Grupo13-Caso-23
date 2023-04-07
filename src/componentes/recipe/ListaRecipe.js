import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link} from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import Swal from 'sweetalert2'


function ListaRecipe(props){
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
          <Row lg={4}>
            {props.theproducts && props.theproducts.map((item) => {
              let id = item.recipe.label
              return (
                <Card
                  className="unproducto"
                  key={item.recipe.uri}
                  style={{ width: "20rem" }}
                >
                  <Card.Img variant="top" src={item.recipe.image} />
                  <Card.Body>
                    <Card.Title>{item.recipe.label}</Card.Title>
                    <Card.Text>{item.recipe.source}</Card.Text>
    
                    <Link to={"/recipe/" + id}>
                      <Button variant="info">Ver</Button>
                    </Link>
                    <Button variant="success" onClick={handleAlergia} style={{ float: "right"}}>Añadir</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </div>
      );
}
export default ListaRecipe;