import React from "react";
import { Card } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ListaRecipe(props) {
  // declaracion del componente ListaRecipe como una función

  const { correo } = useContext(MyContext);
  const { getUsuario } = useContext(MyContext);
  const { alergia } = useContext(MyContext);

  const navigate = useNavigate();

  const handleAñadir = (item) => {

//   Swal.fire({
  //     title: '¿Cuántas porciones quieres añadir?',
  //     input: 'select',
  //     html:
  //   '<select id="porciones" name="porciones" class="swal2-input">' +
  //   '<option value="1">1</option>' +
  //   '<option value="2">2</option>' +
  //   '<option value="3">3</option>' +
  //   '<option value="4">4</option>' +
  //   '<option value="5">5</option>' +
  //   '</select>',
  //     showCancelButton: true,
  //     confirmButtonText: 'Añadir',
  //     denyButtonText: `Don't save`,
  //   }).then((result) => {
  //   /* Read more about isConfirmed, isDenied below */
  //   if (result.isConfirmed) {
  //     Swal.fire('Receta añadida', '', 'success')
  //   } else if (result.isDenied) {
  //     Swal.fire('Cancelado', '', 'info')
  // }
  //   });

    // función manejadora de eventos
    handleAlergiaRecipeAndSubmit(
      item.recipe.label,
      item.recipe.ingredientLines,
      item
    ); // agrega recetas a una lista de alergias DADO un determinado contexto
    // handleSubmit(item);
  };

  const handleAlergiaRecipeAndSubmit = async (name, ingr, item) => {
    getUsuario();

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
        kcal: item.recipe.calories,
        proteina: Math.round(item.recipe.totalNutrients.PROCNT.quantity),
        grasa: Math.round(item.recipe.totalNutrients.FAT.quantity),
        carb: Math.round(item.recipe.totalNutrients.CHOCDF.quantity),
        fibra: Math.round(item.recipe.totalNutrients.FIBTG.quantity),
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
