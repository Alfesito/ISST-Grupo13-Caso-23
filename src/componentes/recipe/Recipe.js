import React from "react";

import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";


function Recipe(props) { // Definicion del componente Recipe
  let { recipeId } = useParams();   // Obtener el parámetro recipeId de la URL mediante el hook useParams de react-router-dom

  let id =
    props.theproducts &&
    props.theproducts.findIndex((el) => el.recipe.label === recipeId);
  let item = props.theproducts[id];

 
  const { handleAlergiaRecipe } = useContext(MyContext);

  const handleAñadir = (name, ingredients) => { //
    handleAlergiaRecipe(name, ingredients);
  };
  return ( // Renderizar el componente Recipe
    <div>
      <div className="containerr">
        <div className="box">
          <div key={item.recipe.label}>
            <div className="product-img">
              <img src={item.recipe.image} width="250" alt="" />
            </div>
                /* Renderizar la lista de ingredientes */
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
              /* Renderizar los valores nutricionales */
              <p className="price">
                Valor nutricional <br />
              </p>
              <div className="nutrValue">
                <ul>
                  <li>
                    Energía: {Math.round(item.recipe.calories)} kcal
                    <br />
                  </li>
                  <li>
                    Proteína:{" "}
                    {Math.round(item.recipe.totalNutrients.PROCNT.quantity)} g
                    <br />
                  </li>
                  <li>
                    Grasa: {Math.round(item.recipe.totalNutrients.FAT.quantity)}{" "}
                    g<br />
                  </li>
                  <li>
                    Carbohidratos:{" "}
                    {Math.round(item.recipe.totalNutrients.ENERC_KCAL.quantity)}{" "}
                    g<br />
                  </li>
                  <li>
                    Fibra:{" "}
                    {Math.round(item.recipe.totalNutrients.ENERC_KCAL.quantity)}{" "}
                    g<br />
                    <br />
                  </li>
                </ul>
              </div>
                /* Renderizar el enlace a la receta completa */
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
                  handleAñadir(
                    item.recipe.label,
                    item.recipe.ingredientLines
                  )
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
