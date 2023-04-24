import React from "react";
import Naavbar from "../Naavbar";
import Table from "./Table";
import { useState, useEffect } from "react";
import Grafico from "./Grafico";

export default function hoy() {
  const [comidas, setComidas] = useState([]);
  const [correo, setCorreo] = useState(sessionStorage.getItem("correo"));

  async function obtenerComidas() {
    const correoActual = sessionStorage.getItem("correo");
    setCorreo(correoActual);
    //`/api/ingestas/${correo}`
    await fetch(`/api/ingestas/${correo}`)
      .then((response) => response.json())
      .then((data) => setComidas(data.reverse()) || console.log(data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    obtenerComidas();
    console.log(correo);
    console.log(comidas);
    
  }, []);

  return (
    <div>
      <Naavbar />
      <Table comidas={comidas}/>
      <Grafico comidas ={comidas}/>
    </div>
  );
}
