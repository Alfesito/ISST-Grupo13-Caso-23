import React from "react";
import Naavbar from "../Naavbar";
import Table from "./Table";
import { useState, useEffect } from "react";
import Grafico from "./Grafico";

export default function hoy() {
  const [comidas, setComidas] = useState([]);
  const [correo, setCorreo] = useState(sessionStorage.getItem("correo"));
  const [totalKcal, setTotalKcal] = useState(0);
  
  const objetivoKcal = 6000;

  async function obtenerComidas() {
  const correoActual = sessionStorage.getItem("correo");
  setCorreo(correoActual);
  //`/api/ingestas/${correo}`
  await fetch(`/api/ingestas/${correo}`)
    .then((response) => response.json())
    .then((data) => {
      setComidas(data.reverse());
      console.log(comidas); // Aquí ya debería mostrar el array actualizado
      const kcalArray = data.map((product) => product.kcal); 
      setTotalKcal(kcalArray.reduce((acc, kcal) => acc + kcal, 0));
      console.log(totalKcal); // Aquí ya debería mostrar la suma de las kcal
    })
    .catch((error) => console.error(error));
}

useEffect(() => {
  obtenerComidas();
}, []);




  
  
  return (
    <div>
      <Naavbar />
      <Table comidas={comidas}/>
      <Grafico comidas ={comidas} actual={totalKcal} maxValue={objetivoKcal}/>
    </div>
  );
}
