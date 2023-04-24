import React from "react";
import Naavbar from "../Naavbar";
import Table from "./Table";
import { useState, useEffect } from "react";
import Grafico from "./Grafico";

export default function hoy() {
  const [comidas, setComidas] = useState([]);
  const [correo, setCorreo] = useState(sessionStorage.getItem("correo"));
  let totalKcal=0;
  let kcalArray
  const objetivoKcal = 6000;

  async function obtenerComidas() {
    const correoActual = sessionStorage.getItem("correo");
    setCorreo(correoActual);
    //`/api/ingestas/${correo}`
    await fetch(`/api/ingestas/${correo}`)
      .then((response) => response.json())
      .then((data) => {
        setComidas(data.reverse());
        sumaKcal();
        console.log(totalKcal)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    obtenerComidas()
    console.log(comidas)

  }, []);



   function sumaKcal(){
    kcalArray = comidas.products.map((product) => product.kcal);
    totalKcal = kcalArray.reduce((acc, kcal) => acc + kcal, 0);
  }
  
  
  return (
    <div>
      <Naavbar />
      <Table comidas={comidas}/>
      <Grafico comidas ={comidas} actual={totalKcal} maxValue={objetivoKcal}/>
    </div>
  );
}
