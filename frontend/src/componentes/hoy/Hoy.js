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
  const [totalKcal, setTotalKcal] = useState(0);
  const [totalProt, setTotalProt] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalGrasas, setTotalGrasas] = useState(0);

  const [edad, setEdad] = useState(null);
  const [altura, setAltura] = useState(null);
  const [peso, setPeso] = useState(null);
  const [sexo, setSexo] = useState(null);

  const TMBhombre = 10 * peso + 6.25 * altura - 5 * edad + 5;
  const TMBmujer = 10 * peso + 6.25 * altura - 5 * edad - 161;

  const TDEE = null;

  const objetivoKcal = 2000;
  const objetivoProt = 0.8 * peso;
  const objetivoGrasa = 0.3 * peso;
  const objetivoCarbs = objetivoKcal - objetivoProt * 4 - objetivoGrasa * 9;

  async function obtenerComidas() {
    //`/api/ingestas/${correo}`
    await fetch(`/api/ingestas/${correo}`)
      .then((response) => response.json())
      .then((data) => {
        setComidas(data.reverse());
        const kcalArray = data.map((product) => product.kcal);
        setTotalKcal(kcalArray.reduce((acc, kcal) => acc + kcal, 0).toFixed(2));

        const protArray = data.map((product) => product.proteina);
        setTotalProt(protArray.reduce((acc, prot) => acc + prot, 0));

        const carbsArray = data.map((product) => product.carb);
        setTotalCarbs(carbsArray.reduce((acc, carb) => acc + carb, 0));

        const grasasArray = data.map((product) => product.grasa);
        setTotalGrasas(grasasArray.reduce((acc, grasa) => acc + grasa, 0));
      })
      .catch((error) => console.error(error));
  }

  async function obtenerUser() {
    await fetch(`/api/perfil/${correo}`)
      .then((response) => response.json())
      .then((data) => {
        setEdad(data.edad);
        setAltura(data.altura);
        setPeso(data.peso);
        setSexo(data.sexo);
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
              comidas={comidas}
              actual={totalKcal}
              maxValue={objetivoKcal}
              titulo={"Kcal"}
              info={(objetivoKcal - totalKcal).toFixed(1) + " restantes"}
            />
          </div>
          <div class="circle">
            <Grafico
              comidas={comidas}
              actual={totalProt}
              maxValue={objetivoProt}
              titulo={"Proteinas"}
              info={(objetivoProt - totalProt).toFixed(1) + " restantes"}
            />
          </div>
          <div class="circle">
            <Grafico
              comidas={comidas}
              actual={totalCarbs}
              maxValue={objetivoCarbs}
              titulo={"Carbohidratos"}
              info={(objetivoCarbs - totalCarbs).toFixed(1) + " restantes"}
            />
          </div>
          <div class="circle">
            <Grafico
              comidas={comidas}
              actual={totalGrasas}
              maxValue={objetivoGrasa}
              titulo={"Grasas"}
              info={(objetivoGrasa - totalGrasas).toFixed(1) + " restantes"}
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
