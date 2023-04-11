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


  const handleAlergiaProd = (product) => {
    console.log(typeof (alergia))
    if (alergia.length !==0 && (product.toLowerCase().includes(alergia)) ){
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
    else{
      Swal.fire("Confirmado", "Producto añadido", "success");
    }
  };
  const handleAlergiaRecipe = (name, ingr,salud) => {
      const jsonStringIngr = JSON.stringify(ingr).toLowerCase();
      const jsonStringSalud= JSON.stringify(salud).toLowerCase();
      
      if(alergia.length !==0 ){
        if(health && jsonStringSalud.includes(health)){
        
          Swal.fire("Confirmado", "Producto añadido", "success");
        }
  
  
        else if (
          jsonStringIngr.toLowerCase().includes(alergia) ||
          name.toLowerCase().includes(alergia)
        ) {
          Swal.fire({
            title: "Este producto contiene "+ alergia,
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
        else{
          Swal.fire("Confirmado", "Producto añadido", "success");
        }
      }

      
      else{
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
        setCuisine
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
