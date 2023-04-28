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
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
