import React from "react";

import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Recipe(props) {
  // Definicion del componente Recipe
  let { recipeId } = useParams(); // Obtener el parámetro recipeId de la URL mediante el hook useParams de react-router-dom

  let id =
    props.theproducts &&
    props.theproducts.findIndex((el) => el.recipe.label === recipeId);
  let item = props.theproducts[id];
  let servings = item.recipe.yield;//RACIONES - SERVINGS

  const { correo } = useContext(MyContext);
  const { getUsuario } = useContext(MyContext);
  const { alergia } = useContext(MyContext);
  const navigate = useNavigate();

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
        comida: item.recipe.label,
        kcal: item.recipe.calories/servings,
        proteina: Math.round(item.recipe.totalNutrients.PROCNT.quantity/servings),
        grasa: Math.round(item.recipe.totalNutrients.FAT.quantity/servings),
        carb: Math.round(item.recipe.totalNutrients.CHOCDF.quantity/servings),
        fibra: Math.round(item.recipe.totalNutrients.FIBTG.quantity/servings),
      }),
    })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/recomendaciones");
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

  const handleAlergiaRecipeAndSubmit = async (name, ingr, item) => {
    getUsuario();

    // const jsonStringIngr = ingr.toLowerCase();
    const jsonStringIngr = JSON.stringify(ingr).toLowerCase();
    const confirm = async () => {
      try {
        await handleSubmit(item);
        Swal.fire("Confirmado", "Producto añadido", "success");
      } catch (error) {
        console.log(error);
      }
    };

    if (
      jsonStringIngr.toLowerCase().includes(alergia.toLowerCase()) ||
      name.toLowerCase().includes(alergia.toLowerCase())
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
  const handleAñadir = (item) => {
    // función manejadora de eventos
    handleAlergiaRecipeAndSubmit(
      item.label,
      item.ingredientLines,
      item
    ); // agrega recetas a una lista de alergias DADO un determinado contexto
    // handleSubmit(item);
  };
  return (
    // Renderizar el componente Recipe
    <div>
      <div className="containerr">
        <div className="box">
          <div key={item.recipe.label}>
            <div className="product-img">
              <img src={item.recipe.image} width="250" alt="" />
            </div>
            {/* Renderizar la lista de ingredientes */}
            <div className="product-info">
              <h1 id="titulo">{item.recipe.label}</h1>

              <p className="price">
                {item.recipe.ingredientLines && (
                  <div className="ingredients">
                    <ul>
                      {item.recipe.ingredientLines.slice(1).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </p>
              {/* Renderizar los valores nutricionales  */}
              <p className="price">
                Valor nutricional por porción<br />
              </p>
              <div className="nutrValue">
                <ul>
                  <li>
                    Energía: {Math.round(item.recipe.calories/servings)} kcal
                    <br />
                  </li>
                  <li>
                    Proteína:{" "}
                    {Math.round(item.recipe.totalNutrients.PROCNT.quantity/servings)} g
                    <br />
                  </li>
                  <li>
                    Grasa: {Math.round(item.recipe.totalNutrients.FAT.quantity/servings)}{" "}
                    g<br />
                  </li>
                  <li>
                    Carbohidratos:{" "}
                    {Math.round(item.recipe.totalNutrients.CHOCDF.quantity/servings)} g
                    <br />
                  </li>
                  <li>
                    Fibra:{" "}
                    {Math.round(item.recipe.totalNutrients.FIBTG.quantity/servings)} g
                    <br />
                    <br />
                  </li>
                </ul>
              </div>
              {/* Renderizar el enlace a la receta completa  */}
              {item.recipe &&
                item.recipe.url &&
                item.recipe.source && ( //REVISAR SI SON NECESARIAS ESTAS CONDICIONES
                  <p className="description">
                    Ir a{" "}
                    <a
                      href={item.recipe.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      receta completa
                    </a>
                  </p>
                )}

              <br />

              <Link to="/recomendaciones">
                <Button variant="info">Volver</Button>
              </Link>
              <Button
                variant="success"
                onClick={() =>
                  handleAñadir(item.recipe.label, item.recipe.ingredientLines)
                }
                style={{ float: "right" }}
              >
                Añadir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
