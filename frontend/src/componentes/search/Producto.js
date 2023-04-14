import React from "react";

import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

function Producto(props) {
  let { productId } = useParams();

  let id = props.theproducts.findIndex((el) => el.food.foodId === productId);
  let item = props.theproducts[id];
  // Cantidad de producto utilizada (por defecto 100g)
  let qu =
    props.theparsed.length > 0 && props.theparsed[0].quantity
      ? props.theparsed[0].quantity
      : 100;

  const { alergia } = useContext(MyContext);
  const {handleAlergiaProd}= useContext(MyContext);

  const handleAñadir = (product,alergia) => {
    handleAlergiaProd(product,alergia)
  }
  return (
    // renderizar el producto
    <div>
      <div className="containerr">
        <div className="box">
          <div key={item.food.foodId}>
            <div className="product-img">
              <img src={item.food.image} width="250" alt="" />
            </div>

            <div className="product-info">
              <h1 id="titulo">{item.food.label}</h1>
                {/* Renderizado del valor nutricional */}
              <p className="price">
                Valor nutricional <br />
              </p>
              <div className="nutrValue">
                <ul>
                  <li>
                    Energía: {(item.food.nutrients.ENERC_KCAL * qu) / 100} kcal
                    <br />
                  </li>
                  <li>
                    Proteína: {(item.food.nutrients.PROCNT * qu) / 100} g
                    <br />
                  </li>
                  <li>
                    Grasa: {(item.food.nutrients.FAT * qu) / 100} g<br />
                  </li>
                  <li>
                    Carbohidratos: {(item.food.nutrients.CHOCDF * qu) / 100} g
                    <br />
                  </li>
                  <li>
                    Fibra: {(item.food.nutrients.FIBTG * qu) / 100} g<br />
                    <br />
                  </li>
                </ul>
              </div>

              <p className="description">Categoría: {item.food.category} </p>
              <br />
              <Link to="/alimentacion">
                <Button variant="info">Volver</Button>
              </Link>
              <Button
                variant="success"
                onClick={()=>handleAñadir(item.food.label,alergia)}
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

export default Producto;
