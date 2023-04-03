import React from "react";

import { Link, useParams } from "react-router-dom";

function Producto(props) {
  let { productId } = useParams();
  console.log("🚀 ~ file: Producto.js ~ line 7 ~ Producto ~ productId", productId)
  
  let id = props.theproducts.findIndex((el) => el.food.foodId === productId)
  let item = props.theproducts[id]
  let qu = props.theparsed.length > 0 && props.theparsed[0].quantity ? props.theparsed[0].quantity : 100
  console.log(item.food.nutrients.ENERC_KCAL)

  return (
    <div>
      <div className="containerr">
        <div className="box">
          <div key={item.food.foodId}>
            <div className="product-img">
              <img
                src={
                  item.food.image
                }
                width="250"
                alt=""
              />
            </div>

            <div className="product-info">
              <h1 id="titulo">{item.food.label}</h1>

              <p className="price">
                ENERC_KCAL: {(item.food.nutrients.ENERC_KCAL*qu)/100},
                PROCNT: {(item.food.nutrients.PROCNT*qu)/100},
                FAT: {(item.food.nutrients.FAT*qu)/100},
                CHOCDF: {(item.food.nutrients.CHOCDF*qu)/100},
                FIBTG: {(item.food.nutrients.FIBTG*qu)/100}
              </p>

              <p className="description">Categoría: {item.food.category} </p>

              <br />

              <Link to="/alimentacion">
                <button className="hola" id="volver">
                  Volver
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Producto;
