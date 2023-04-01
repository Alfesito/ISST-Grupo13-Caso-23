import React from "react";

import { Link, useParams } from "react-router-dom";

function Producto(props) {
  let { productId } = useParams();
  console.log("🚀 ~ file: Producto.js ~ line 7 ~ Producto ~ productId", productId)
  
  //let item = props.theproducts[Number(productId)]
  let id = props.theproducts.findIndex((el) => el.food.foodId === productId)
  let item = props.theproducts[id]
  console.log(item)
 
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
                ENERC_KCAL: {item.food.nutrients.ENERC_KCAL},
                PROCNT: {item.food.nutrients.PROCNT},
                FAT: {item.food.nutrients.FAT},
                CHOCDF: {item.food.nutrients.CHOCDF},
                FIBTG: {item.food.nutrients.FIBTG}
              </p>

              <p className="description">Category: {item.food.category} </p>

              <br />

              <Link to="/navbar">
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
