import React from "react";

import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import Swal from "sweetalert2";

function Producto(props) {
  let { productId } = useParams();
  console.log(
    "🚀 ~ file: Producto.js ~ line 7 ~ Producto ~ productId",
    productId
  );

  let id = props.theproducts.findIndex((el) => el.food.foodId === productId);
  let item = props.theproducts[id];
  let qu =
    props.theparsed.length > 0 && props.theparsed[0].quantity
      ? props.theparsed[0].quantity
      : 100;
  console.log(item.food.nutrients.ENERC_KCAL);

  const { alergia } = useContext(MyContext);

  const handleAlergia = () => {
    Swal.fire({
      title: "Este alimento tiene tu alergia",
      text: "¿Quieres seguir añadiendo este alimento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,añadir",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelar", "success");
      }
    });
  };

  return (
    <div>
      <div className="containerr">
        <div className="box">
          <div key={item.food.foodId}>
            <div className="product-img">
              <img src={item.food.image} width="250" alt="" />
            </div>

            <div className="product-info">
              <h1 id="titulo">{item.food.label}</h1>

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
                    Proteína: {(item.food.nutrients.PROCNT * qu) / 100} g,¡
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
              <Button variant="success" onClick={handleAlergia} style={{ float: "right" }}>
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
