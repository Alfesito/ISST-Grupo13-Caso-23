import React from "react";
import { createContext } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
export const MyContext = createContext();

export default function ContextProvider({ children }) {
  const [alergia, setAlergia] = useState(null);

  const handleAlergiaProd = (product) => {
    if (product.toLowerCase().includes(alergia)) {
      Swal.fire({
        title: "Este producto contiene tu alergia",
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
  };
  const handleAlergiaRecipe = (product,json) => {
    const jsonString = JSON.stringify(json).toLowerCase();

    if (jsonString.toLowerCase().includes(alergia) || product.toLowerCase().includes(alergia) ) {
      Swal.fire({
        title: "Este producto contiene tu alergia",
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
  };

  return (
    <MyContext.Provider
      value={{ alergia, setAlergia, handleAlergiaProd, handleAlergiaRecipe }}
    >
      {children}
    </MyContext.Provider>
  );
}
