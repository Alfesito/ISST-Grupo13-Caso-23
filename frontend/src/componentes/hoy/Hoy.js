import React from "react";
import Naavbar from "../Naavbar";
import Table from "./Table";
import { useState, useEffect } from "react";
import Grafico from "./Grafico";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

export default function Hoy() {
  const [comidas, setComidas] = useState([]);
  const { correo } = useContext(MyContext);

  const { actualKcal, setActualKcal } = useContext(MyContext);
  const { actualProt, setActualProt } = useContext(MyContext);
  const { actualCarbs, setActualCarbs } = useContext(MyContext);
  const { actualGrasas, setActualGrasas } = useContext(MyContext);

  const { objetivoKcal, setobjetivoKcal } = useContext(MyContext);
  const { objetivoProt, setObjetivoProt } = useContext(MyContext);
  const { objetivoGrasa, setObjetivoGrasa } = useContext(MyContext);
  const { objetivoCarbs, setObjetivoCarbs } = useContext(MyContext);

  const [nutriScoreArray, setNutriscoreArray] = useState([])

  const [ nutriscore, setNutriscore] = useState("")

  const actividadFisica = {
    BAJA: "baja",
    NORMAL: "normal",
    MODERADA: " moderada",
    ALTA: "alta",
  };

  const objetivos = (edad, altura, peso, sexo, actividad) => {
    let TMB;
    if (sexo == "hombre") {
      TMB = 10 * peso + 6.25 * altura - 5 * edad + 5;
    } else {
      TMB = 10 * peso + 6.25 * altura - 5 * edad - 161;
    }

    let TDEE;
    if (actividad === actividadFisica.BAJA) {
      TDEE = TMB * 1.55;
    } else if (actividad === actividadFisica.NORMAL) {
      TDEE = TMB * 1.85;
    } else if (actividad === actividadFisica.MODERADA) {
      TDEE = TMB * 2.2;
    } else {
      TDEE = TMB * 2.4;
    }

    setobjetivoKcal(TDEE);
    setObjetivoProt((0.15 * TDEE) / 4);
    setObjetivoGrasa((0.3 * TDEE) / 9);
    setObjetivoCarbs(TDEE - 0.15 * TDEE - 0.3 * TDEE);
  };

  async function obtenerComidas() {
    //`/api/ingestas/${correo}`
    const fechaHoy = new Date().toISOString().slice(0, 10);

    await fetch(`/api/ingestas/${correo}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredComidas = data.filter(
          (producto) => producto.fecha === fechaHoy
        );
        setComidas(filteredComidas.reverse());

        const kcalArray = filteredComidas.map((product) => product.kcal);
        setActualKcal(
          kcalArray.reduce((acc, kcal) => acc + kcal, 0).toFixed(2)
        );

        const protArray = filteredComidas.map((product) => product.proteina);
        setActualProt(protArray.reduce((acc, prot) => acc + prot, 0));

        const carbsArray = filteredComidas.map((product) => product.carb);
        setActualCarbs(carbsArray.reduce((acc, carb) => acc + carb, 0));

        const grasasArray = filteredComidas.map((product) => product.grasa);
        setActualGrasas(grasasArray.reduce((acc, grasa) => acc + grasa, 0));

        const nutriScoreArray = filteredComidas.map((product) => product.nutriscore);
        setNutriscoreArray(nutriScoreArray); // Aquí se imprimirá el array con los valores de nutriscore de cada producto.
  
      })
      .catch((error) => console.error(error));
  }

  async function obtenerUser() {
    await fetch(`/api/perfil/${correo}`)
      .then((response) => response.json())
      .then((data) => {
        objetivos(data.edad, data.altura, data.peso, data.sexo, data.actividad);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    obtenerComidas();
    obtenerUser();
  }, []);

  return (
    <div>
      <Naavbar />
      <div class="hoy">
        <div class="graficos-wrapper">
          <div class="circle">
            <Grafico
              actual={actualKcal}
              maxValue={objetivoKcal}
              titulo={"Kcal"}
              info={Math.round((objetivoKcal - actualKcal)) + " restantes"}
            />
          </div>
          <div class="circle">
            <Grafico
              actual={actualProt}
              maxValue={objetivoProt}
              titulo={"Proteinas"}
              info={Math.round((objetivoProt - actualProt)) + " g restantes".toLowerCase()}
            />
          </div>
          <div class="circle">
            <Grafico
              actual={actualCarbs}
              maxValue={objetivoCarbs}
              titulo={"Carbohidratos"}
              info={Math.round((objetivoCarbs - actualCarbs)) + " g restantes".toLowerCase()}
            />
          </div>
          <div class="circle">
            <Grafico
              actual={actualGrasas}
              maxValue={objetivoGrasa}
              titulo={"Grasas"}
              info={Math.round((objetivoGrasa - actualGrasas)) + " g restantes".toLowerCase()}
            />
          </div>
        </div>
        <div class="table-wrapper">
          <Table comidas={comidas} nutriscorearray ={nutriScoreArray} />
        </div>
      </div>
    </div>
  );
}
