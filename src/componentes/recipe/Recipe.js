import React from "react";

import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Recipe(props) {
  let { recipeId } = useParams();
  console.log("🚀 ~ file: Producto.js ~ line 7 ~ Producto ~ productId", recipeId)
  
  let id = props.theproducts && props.theproducts.findIndex((el) => el.recipe.label === recipeId)
  let item = props.theproducts[id]

  return (
    <div>
      <div className="containerr">
        <div className="box">
          <div key={item.recipe.label}>
            <div className="product-img">
              <img
                src={
                  item.recipe.image
                }
                width="250"
                alt=""
              />
            </div>

            <div className="product-info">
              <h1 id="titulo">{item.recipe.label}</h1>

                <p className="price">
                {item.recipe.ingredientLines &&
                  <div className="ingredients">
                    <ul>
                      {item.recipe.ingredientLines.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>}
                </p>


                <p className="price">
                Valor nutricional: <br/>
                </p>
                <div className="nutrValue">
                  <ul>
                    <li>Energía: {Math.round(item.recipe.calories)} kcal,<br/></li>
                    <li>Proteína: {Math.round(item.recipe.totalNutrients.PROCNT.quantity)} g,<br/></li> 
                    <li>Grasa: {Math.round(item.recipe.totalNutrients.FAT.quantity)} g,<br/></li>
                    <li>Carbohidratos: {Math.round(item.recipe.totalNutrients.ENERC_KCAL.quantity)} g,<br/></li>
                    <li>Fibra: {Math.round(item.recipe.totalNutrients.ENERC_KCAL.quantity)} g<br/><br/></li>
                </ul>
              </div>

                {item.recipe && item.recipe.url && item.recipe.source && ( //REVISAR SI SON NECESARIAS ESTAS CONDICIONES
                  

                <p className="description">
                  Ir a <a href={item.recipe.url} target="_blank" rel="noopener noreferrer"> receta completa</a>
                </p>

                
                  
                )}


              <br />

              <Link to="/recomendaciones">
                <Button variant="info">Volver</Button>
              </Link>
              <Button variant="success" style={{ float: "right"}}>Añadir</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
