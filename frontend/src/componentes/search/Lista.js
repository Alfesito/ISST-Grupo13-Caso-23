import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import nutriA from "../../images/nutriScore/nutriA.png";
import nutriB from "../../images/nutriScore/nutriB.png";
import nutriC from "../../images/nutriScore/nutriC.png";
import nutriD from "../../images/nutriScore/nutriD.png";
import nutriE from "../../images/nutriScore/nutriE.png";


function Lista(props) {
  // Devuelve una lista de productos
  const { correo } = useContext(MyContext);
  const {getUsuario}= useContext(MyContext);
  const {alergia} = useContext(MyContext);
  const {calculateNutriScore}= useContext(MyContext);
  const { limite, setLimite } = useContext(MyContext);


  const navigate = useNavigate();

  // Cantidad de producto utilizada (por defecto 100g)
  let qu =
    props.theparsed.length > 0 && props.theparsed[0].quantity
      ? props.theparsed[0].quantity
      : 100;

      const handleAñadir = (item) => {
        const nutriScore = calculateNutriScore(
          item.food.nutrients.ENERC_KCAL,
          item.food.nutrients.FAT,
          item.food.nutrients.FIBTG,
          item.food.nutrients.PROCNT,
          item.food.nutrients.CHOCDF
        );
    
        if (nutriScore == "D") {
          Swal.fire({
            title: "¿Quieres continuar?",
            imageUrl: nutriD,
            imageWidth: 300,
            imageHeight: 163,
            imageAlt: "Nuriscore D",
            confirmButtonText: "Continuar",
          }).then((result) => {
            if (result.isConfirmed) {
              
              handleAlergiaProdAndSubmit(item);
            }
          });
        } else if (nutriScore == "E"){
        
          Swal.fire({
            title: "¿Quieres continuar?",
            imageUrl: nutriE,
            imageWidth: 300,
            imageHeight: 163,
            imageAlt: "Nuriscore E",
            confirmButtonText: "Continuar",
          }).then((result) => {
            if (result.isConfirmed) {
              handleAlergiaProdAndSubmit(item);
            }
          });
        
        } else {
          handleAlergiaProdAndSubmit(item);
        }
    
        // handleSubmit();
      };
  
  const handleAlergiaProdAndSubmit = async (item) => {
    getUsuario();
  
    const confirm = async () => {
      try {
        await handleSubmit(item);
        setLimite(true)
        Swal.fire("Confirmado", "Producto añadido", "success");
      } catch (error) {
        console.log(error);
      }
    };
  
    if (alergia.length !== 0 && item.food.label.toLowerCase().includes(alergia)) {
      Swal.fire({
        title: "Este producto contiene " + alergia,
        text: "¿Quieres continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,añadir",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await confirm();
        }
      });
    } else {
      await confirm();
    }
  };

  const handleSubmit = async (item) => {
    await fetch(`/api/añadir/ingestas/${correo}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        fecha: new Date(),
        correo: correo,
        comida: item.food.label,
        kcal: (item.food.nutrients.ENERC_KCAL * qu) / 100,
        proteina: (item.food.nutrients.PROCNT * qu) / 100,
        grasa: (item.food.nutrients.FAT * qu) / 100,
        carb: (item.food.nutrients.CHOCDF * qu) / 100,
        fibra: (item.food.nutrients.FIBTG * qu) / 10,
        nutriscore: calculateNutriScore(item.food.nutrients.ENERC_KCAL, item.food.nutrients.FAT, item.food.nutrients.FIBTG, item.food.nutrients.PROCNT, item.food.nutrients.CHOCDF)
      }),
    })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/alimentacion");
        } else {
          //alert("Algo ha salido mal");
          Swal.fire({
            icon: 'error',
              title: 'Vaya...',
              text: 'Algo ha salido mal',
          })
        }
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
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
                  <Card.Text>
                    NutriScore: {calculateNutriScore(item.food.nutrients.ENERC_KCAL, item.food.nutrients.FAT, item.food.nutrients.FIBTG, item.food.nutrients.PROCNT, item.food.nutrients.CHOCDF)}
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
                  <Card.Text>
                    NutriScore: {calculateNutriScore(item.food.nutrients.ENERC_KCAL, item.food.nutrients.FAT, item.food.nutrients.FIBTG, item.food.nutrients.PROCNT, item.food.nutrients.CHOCDF)}
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
    </div>
  );
}

export default Lista;
