import React from "react";
import { createContext } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
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
    // Valor de referencia para cada componente por cada 100g
    const refEnergy = 335; // kJ
    const refFat = 1; // g
    const refFiber = 3; // g
    const refProtein = 0.5; // g
    const refCarbs = 5; // g
  
    // Calcula el valor de cada componente por cada 100g
    const energyValue = energy / refEnergy;
    const fatValue = fat / refFat;
    const fiberValue = fiber / refFiber;
    const proteinValue = protein / refProtein;
    const carbsValue = carbs / refCarbs;
  
    // Calcula la puntuación de cada componente
    const energyPoints = Math.min(Math.floor(energyValue * 2.5), 10);
    const fatPoints = Math.min(Math.floor(fatValue * 10), 10);
    const fiberPoints = Math.floor(fiberValue * 2);
    const proteinPoints = Math.floor(proteinValue * 5);
    const carbsPoints = Math.min(Math.floor(carbsValue * 5), 10);
  
    // Calcula la puntuación total
    const totalPoints = energyPoints + fatPoints - fiberPoints - proteinPoints - carbsPoints;
  
    // Asigna la letra y el color correspondiente según la puntuación total
    if (totalPoints <= -1) {
      return "A";
    } else if (totalPoints <= 2) {
      return "B";
    } else if (totalPoints <= 10) {
      return "C";
    } else if (totalPoints <= 18) {
      return "D";
    } else {
      return "E";
    }
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
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
