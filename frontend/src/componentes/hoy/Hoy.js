import React from "react";
import Naavbar from "../Naavbar";
import Table from "./Table";
import { useState, useEffect } from "react";
import Grafico from "./Grafico";

export default function hoy() {
  const [comidas, setComidas] = useState([]);
  const [correo, setCorreo] = useState(sessionStorage.getItem("correo"));
  const [totalKcal, setTotalKcal] = useState(0);
  const [totalProt, setTotalProt] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalGrasas, setTotalGrasas] = useState(0);

  const objetivoKcal = 6000;

  async function obtenerComidas() {
    const correoActual = sessionStorage.getItem("correo");
    setCorreo(correoActual);
    //`/api/ingestas/${correo}`
    await fetch(`/api/ingestas/${correo}`)
      .then((response) => response.json())
      .then((data) => {
        setComidas(data.reverse());
        const kcalArray = data.map((product) => product.kcal);
        setTotalKcal(kcalArray.reduce((acc, kcal) => acc + kcal, 0));
        
        const protArray = data.map((product) => product.proteina);
        setTotalProt(protArray.reduce((acc, prot) => acc + prot, 0));

        const carbsArray = data.map((product) => product.carb);
        setTotalCarbs(carbsArray.reduce((acc, carb) => acc + carb, 0));

        const grasasArray = data.map((product) => product.grasa);
        setTotalGrasas(grasasArray.reduce((acc, grasa) => acc + grasa, 0));


      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    obtenerComidas();
  }, []);

  return (
    <div>
  <Naavbar />
  <div class="hoy">
    <div class="graficos-wrapper">
      <div class="grafico-wrapper">
        <Grafico
          comidas={comidas}
          actual={totalKcal}
          maxValue={objetivoKcal}
          titulo={"Kcal"}
        />
      </div>
      <div class="grafico-wrapper">
        <Grafico
          comidas={comidas}
          actual={totalProt}
          maxValue={objetivoKcal}
          titulo={"Proteinas"}
        />
      </div>
      <div class="grafico-wrapper">
        <Grafico
          comidas={comidas}
          actual={totalCarbs}
          maxValue={objetivoKcal}
          titulo={"Carbohidratos"}
        />
      </div>
      <div class="grafico-wrapper">
        <Grafico
          comidas={comidas}
          actual={totalGrasas}
          maxValue={objetivoKcal}
          titulo={"Grasas"}
        />
      </div>
    </div>
    <div class="table-wrapper">
      <Table comidas={comidas} />
    </div>
  </div>
</div>

  );
}
