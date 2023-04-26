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
