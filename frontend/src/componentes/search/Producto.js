import React from "react";

import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { useEffect } from "react";
import Swal from "sweetalert2";


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
  const { correo } = useContext(MyContext);
  const { getUsuario } = useContext(MyContext);

  const navigate = useNavigate();

  const handleAñadir = (item) => {
    handleAlergiaProdAndSubmit(item);
    // handleSubmit();
  };

  const handleAlergiaProdAndSubmit = async (item) => {
    getUsuario();

    const confirm = async () => {
      try {
        await handleSubmit(item);
        Swal.fire("Confirmado", "Producto añadido", "success");
      } catch (error) {
        console.log(error);
      }
    };

    if (
      alergia.length !== 0 &&
      item.food.label.toLowerCase().includes(alergia)
    ) {
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

  const handleSubmit = async () => {
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
                onClick={() => handleAñadir(item)}
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
