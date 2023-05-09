import React from "react";
import { createContext } from "react";
import { useState } from "react";
export const MyContext = createContext();

export default function ContextProvider({ children }) {
  const [alergia, setAlergia] = useState("");
  const [health, setHealth] = useState("");
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [correo, setCorreo] = useState("");

  const [actualKcal, setActualKcal] = useState(0);
  const [actualProt, setActualProt] = useState(0);
  const [actualCarbs, setActualCarbs] = useState(0);
  const [actualGrasas, setActualGrasas] = useState(0);

  const [objetivoKcal, setobjetivoKcal] = useState(0);
  const [objetivoProt, setObjetivoProt] = useState(0);
  const [objetivoGrasa, setObjetivoGrasa] = useState(0);
  const [objetivoCarbs, setObjetivoCarbs] = useState(0);

  const[ limite, setLimite] = useState(true);

  const logInCorreo = (email) => {
    setCorreo(email);
  };
  const logOutCorreo = () => {
    setCorreo("");
  };

  const getUsuario = async () => {
    await fetch(`/api/perfil/${correo}`)
      .then((response) => response.json())
      .then(
        (data) =>
          setAlergia(data.indeseado) ||
          setCuisine(data.cocina_fav) ||
          setHealth(data.alergia) ||
          setDiet(data.dieta)
      )
      .catch((error) => console.error(error));
  };

  
  function calculateNutriScore(energy, fat, fiber, protein, carbs) {
    // Convert energy from kcal to kJ
    energy = energy * 4.184;
    let sugar = carbs * 0.25;
  
    // Calculate the score for saturated fat
    let saturatedFatScore;
    if (fat <= 1) {
      saturatedFatScore = 0;
    } else if (fat > 1 && fat <= 2) {
      saturatedFatScore = 1;
    } else if (fat > 2 && fat <= 3) {
      saturatedFatScore = 2;
    } else if (fat > 3 && fat <= 4) {
      saturatedFatScore = 3;
    } else if (fat > 4 && fat <= 5) {
      saturatedFatScore = 4;
    } else if (fat > 5 && fat <= 6) {
      saturatedFatScore = 5;
    } else if (fat > 6 && fat <= 7) {
      saturatedFatScore = 6;
    } else {
      saturatedFatScore = 7;
    }
  
    // Calculate the score for sugars
    let sugarScore;
    if (sugar <= 3.5) {
      sugarScore = 0;
    } else if ( sugar > 3.5 && sugar <= 8) {
      sugarScore = 1;
    } else if (sugar > 8 && sugar <= 12.5) {
      sugarScore = 2;
    } else if (sugar > 12.5 && sugar <= 16) {
      sugarScore = 3;
    } else if (sugar > 1 && sugar <= 20.5) {
      sugarScore = 4;
    } else {
      sugarScore = 5;
    }
  
    // Calculate the score for fruits and vegetables
    let fruitsVegetablesScore;
    if (fiber < 1.2) {
      fruitsVegetablesScore = 0;
    } else if (fiber >= 1.2 && fiber < 1.9) {
      fruitsVegetablesScore = 2;
    } else if (fiber >= 1.9 && fiber < 2.8) {
      fruitsVegetablesScore = 3;
    } else {
      fruitsVegetablesScore = 4;
    }
  
    // Calculate the energy score per 100g of product
    const energyPer100g = energy / (fat + carbs + protein);
    let energyScore;
    if (energyPer100g <= 250) {
      energyScore = 0;
    } else if (energyPer100g > 250 && energyPer100g <= 570) {
      energyScore = 2;
    } else if (energyPer100g > 570 && energyPer100g <= 805) {
      energyScore = 3;
    } else if ( energyPer100g > 705 && energyPer100g <= 1140) {
      energyScore = 4;
    } else if (energyPer100g > 1140 && energyPer100g <= 1375) {
      energyScore = 5;
    } else {
      energyScore = 6;
    }
  
    // Calculate the final NutriScore
    const nutriScore = energyScore + sugarScore + saturatedFatScore - fruitsVegetablesScore

    let nutriScoreLetter;
    if (nutriScore <= 1) {
      nutriScoreLetter = 'A';
    } else if (nutriScore <= 2) {
      nutriScoreLetter = 'B';
    } else if (nutriScore <= 6) {
      nutriScoreLetter = 'C';
    } else if (nutriScore <= 9) {
      nutriScoreLetter = 'D';
    } else {
      nutriScoreLetter = 'E';
    }  
    // console.log(energyScore , sugarScore , saturatedFatScore , fruitsVegetablesScore)
    return nutriScoreLetter;
  }
  


 
  return (
    <MyContext.Provider
      value={{
        alergia,
        setAlergia,
        actualKcal, setActualKcal,
        actualProt, setActualProt,
        actualCarbs, setActualCarbs,
        actualGrasas, setActualGrasas,
        objetivoKcal, setobjetivoKcal,
        objetivoProt, setObjetivoProt,
        objetivoGrasa, setObjetivoGrasa,
        objetivoCarbs, setObjetivoCarbs,

        health,
        setHealth,
        diet,
        setDiet,
        cuisine,
        setCuisine,
        correo,
        setCorreo,
        logInCorreo,
        logOutCorreo,
        getUsuario,
        calculateNutriScore,
        limite,
        setLimite
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
