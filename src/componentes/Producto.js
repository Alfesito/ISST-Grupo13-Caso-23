import React from "react";

import { Link, useParams } from "react-router-dom";

function Producto(props) {
  let { productId } = useParams();
  console.log("🚀 ~ file: Producto.js ~ line 7 ~ Producto ~ productId", productId)
  
  let item = props.theproducts[Number(productId)]

 
  return (
    <div>
      <div className="containerr">
        <div className="box">
          <div key={item.id}>
            <div id="divproductid">{Number(item.id)-1}</div>
            <div className="product-img">
              <img
                src={
                  item.images[Math.ceil(Math.random() * item.images.length - 1)]
                }
                width="250"
                alt=""
              />
            </div>

            <div className="product-info">
              <h1 id="titulo">{item.title}</h1>

              <p className="price">
                {item.price} $ Rating : {item.rating} Stock :{item.stock}
              </p>

              <p className="description">{item.description} </p>

              <br />

              <Link to="/">
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
