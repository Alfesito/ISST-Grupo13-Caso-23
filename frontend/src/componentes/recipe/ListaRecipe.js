import React, { useState } from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import nutriA from "../../images/nutriScore/nutriA.png";
import nutriB from "../../images/nutriScore/nutriB.png";
import nutriC from "../../images/nutriScore/nutriC.png";
import nutriD from "../../images/nutriScore/nutriD.png";
import nutriE from "../../images/nutriScore/nutriE.png";

function ListaRecipe(props) {
  // declaracion del componente ListaRecipe como una función

  const { correo } = useContext(MyContext);
  const { alergia } = useContext(MyContext);
  const { calculateNutriScore } = useContext(MyContext);

  const navigate = useNavigate();

  const handleAñadir = (item) => {
    const numPorciones = item.recipe.yield;

    const nutriScore = calculateNutriScore(
      item.recipe.totalNutrients.ENERC_KCAL.quantity / numPorciones,
      item.recipe.totalNutrients.FAT.quantity / numPorciones,
      item.recipe.totalNutrients.FIBTG.quantity / numPorciones,
      item.recipe.totalNutrients.PROCNT.quantity / numPorciones,
      item.recipe.totalNutrients.CHOCDF.quantity / numPorciones
    );
    

    if (nutriScore === "D") {
      Swal.fire({
        title: "¿Quieres continuar?",
        imageUrl: nutriD,
        imageWidth: 300,
        imageHeight: 163,
        imageAlt: "Nuriscore D",
        confirmButtonText: "Añadir",
      }).then((result) => {
        if (result.isConfirmed) {

          let optionsHtml = "";
          for (let i = 1; i <= numPorciones; i++) {
            optionsHtml += `<option value="${i}">${i}</option>`;
          }
      
          Swal.fire({
            title: "¿Cuántas porciones quieres añadir?",
      
            html:
              '<select id="porciones" name="porciones" class="swal2-input">' +
              optionsHtml,
      
            showCancelButton: true,
            confirmButtonText: "Añadir",
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
              const porcionesElegidas = document.getElementById("porciones").value;
              Swal.fire("Receta añadida", "", "success");
              handleAlergiaRecipeAndSubmit(
                item.recipe.label,
                item.recipe.ingredientLines,
                item,
                porcionesElegidas,
                numPorciones
              );
            } else if (result.isDenied) {
              Swal.fire("Cancelado", "", "info");
            }
          });

        }
      });
    } else if (nutriScore === "E") {
      Swal.fire({
        title: "¿Quieres continuar?",
        imageUrl: nutriE,
        imageWidth: 300,
        imageHeight: 163,
        imageAlt: "Nuriscore E",
      }).then((result) => {
        if (result.isConfirmed) {

          let optionsHtml = "";
          for (let i = 1; i <= numPorciones; i++) {
            optionsHtml += `<option value="${i}">${i}</option>`;
          }
      
          Swal.fire({
            title: "¿Cuántas porciones quieres añadir?",
      
            html:
              '<select id="porciones" name="porciones" class="swal2-input">' +
              optionsHtml,
      
            showCancelButton: true,
            confirmButtonText: "Añadir",
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
              const porcionesElegidas = document.getElementById("porciones").value;
              Swal.fire("Receta añadida", "", "success");
              handleAlergiaRecipeAndSubmit(
                item.recipe.label,
                item.recipe.ingredientLines,
                item,
                porcionesElegidas,
                numPorciones
              );
            } else if (result.isDenied) {
              Swal.fire("Cancelado", "", "info");
            }
          });
          
        }
      });
    }
    else{
      let optionsHtml = "";
      for (let i = 1; i <= numPorciones; i++) {
        optionsHtml += `<option value="${i}">${i}</option>`;
      }
  
      Swal.fire({
        title: "¿Cuántas porciones quieres añadir?",
  
        html:
          '<select id="porciones" name="porciones" class="swal2-input">' +
          optionsHtml,
  
        showCancelButton: true,
        confirmButtonText: "Añadir",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const porcionesElegidas = document.getElementById("porciones").value;
          Swal.fire("Receta añadida", "", "success");
          handleAlergiaRecipeAndSubmit(
            item.recipe.label,
            item.recipe.ingredientLines,
            item,
            porcionesElegidas,
            numPorciones
          );
        } else if (result.isDenied) {
          Swal.fire("Cancelado", "", "info");
        }
      });
    }

    // Crear el HTML del select con opciones generadas dinámicamente
    
  };

  const handleAlergiaRecipeAndSubmit = async (
    name,
    ingr,
    item,
    porcionesElegidas,
    numPorciones
  ) => {
    const jsonStringIngr = JSON.stringify(ingr).toLowerCase();
    const confirm = async () => {
      try {
        await handleSubmit(item, porcionesElegidas, numPorciones);
        Swal.fire("Confirmado", "Producto añadido", "success");
      } catch (error) {
        console.log(error);
      }
    };

    if (
      (jsonStringIngr.toLowerCase().includes(alergia.toLowerCase()) ||
        name.toLowerCase().includes(alergia.toLowerCase())) &&
      alergia !== ""
    ) {
      Swal.fire({
        title: "Este producto contiene " + alergia.toLowerCase(),
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

  const handleSubmit = async (item, porcionesElegidas, numPorciones) => {
    await fetch(`/api/añadir/ingestas/${correo}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        fecha: new Date(),
        correo: correo,
        comida: item.recipe.label,
        kcal: (item.recipe.calories / numPorciones) * porcionesElegidas,
        proteina:
          Math.round(
            item.recipe.totalNutrients.PROCNT.quantity / numPorciones
          ) * porcionesElegidas,
        grasa:
          Math.round(item.recipe.totalNutrients.FAT.quantity / numPorciones) *
          porcionesElegidas,
        carb:
          Math.round(
            item.recipe.totalNutrients.CHOCDF.quantity / numPorciones
          ) * porcionesElegidas,
        fibra:
          Math.round(item.recipe.totalNutrients.FIBTG.quantity / numPorciones) *
          porcionesElegidas,
        nutriscore: calculateNutriScore(
          item.recipe.totalNutrients.ENERC_KCAL / numPorciones,
          item.recipe.totalNutrients.FAT.quantity / numPorciones,
          item.recipe.totalNutrients.FIBTG.quantity / numPorciones,
          item.recipe.totalNutrients.PROCNT.quantity / numPorciones,
          item.recipe.totalNutrients.CHOCDF.quantity / numPorciones
        ),
      }),
    })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/recomendaciones");
          console.log(res);
        } else {
          //alert("Algo ha salido mal");
          Swal.fire({
            icon: "error",
            title: "Vaya...",
            text: "Algo ha salido mal",
          });
        }
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
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
                  <Card.Text>
                    NutriScore:{" "}
                    {calculateNutriScore(
                      item.recipe.totalNutrients.ENERC_KCAL,
                      item.recipe.totalNutrients.FAT.quantity /
                        item.recipe.yield,
                      item.recipe.totalNutrients.FIBTG.quantity /
                        item.recipe.yield,
                      item.recipe.totalNutrients.PROCNT.quantity /
                        item.recipe.yield,
                      item.recipe.totalNutrients.SUGAR.quantity /
                        item.recipe.yield,
                      item.recipe.totalNutrients.CHOCDF.quantity /
                        item.recipe.yield
                    )}
                  </Card.Text>

                  <Link to={"/recipe/" + id}>
                    {/* anadir vista de la receta */}
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
export default ListaRecipe;
