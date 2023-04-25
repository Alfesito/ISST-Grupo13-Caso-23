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
  }
  const logOutCorreo = () => {
    setCorreo("");

  }

  const getUsuario = async () => {
    await fetch(`/api/perfil/${correo}`)
      .then(response => response.json())
      .then(data => setAlergia(data.indeseado) ||
        setCuisine(data.cocina_fav) ||
        setHealth(data.alergia) ||
        setDiet(data.dieta))
      .catch(error => console.error(error));
  }


  const handleAlergiaProd = async (product) => {
    getUsuario();

    if (alergia.length !== 0 && (product.toLowerCase().includes(alergia))) {
      Swal.fire({
        title: "Este producto contiene " + alergia,
        text: "¿Quieres continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,añadir",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Confirmado", "Producto añadido", "success");
        }
      });
    }
    else {
      Swal.fire("Confirmado", "Producto añadido", "success");
    }
  };
  const handleAlergiaRecipe = async (name, ingr) => {
    getUsuario();

    const jsonStringIngr = JSON.stringify(ingr).toLowerCase();
    if (
      jsonStringIngr.toLowerCase().includes(alergia.toLowerCase()) ||
      name.toLowerCase().includes(alergia.toLowerCase())
    ) {
      Swal.fire({
        title: "Este producto contiene " + alergia.toLowerCase(),
        text: "¿Quieres continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,añadir",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Confirmado", "Producto añadido", "success");
        }
      });
    }
    else {
      Swal.fire("Confirmado", "Producto añadido", "success");
    }

  };

  return (
    <MyContext.Provider
      value={{
        alergia,
        setAlergia,
        handleAlergiaProd,
        handleAlergiaRecipe,
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
        getUsuario
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
