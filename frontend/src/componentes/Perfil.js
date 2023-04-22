import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
export default function Prueba() {

  const [correo, setCorreo] = useState(sessionStorage.getItem('correo'));
  const [perfil, setPerfil] = useState([]);

  useEffect(() => {
    getDatosUsuario();
    console.log(correo)
    console.log(perfil)
  }, []);

  async function getDatosUsuario(){
    const correoActual = sessionStorage.getItem('correo');
    setCorreo(correoActual);
    await fetch(`/api/perfil/${correo}`)
            .then(response => response.json())
            .then(data => setPerfil(data) || console.log(data))
            .catch(error => console.error(error));
  }

  return (
    <div>
      
      <Link to="/perfil"> </Link>
        
        <h1><b>Nombre de usuario:</b></h1>
        <div>
            <p>Altura:{perfil.altura}</p>
            <p>Peso:{perfil.peso}</p>
            <p>Sexo:{perfil.sexo}</p>
            <p>Producto no deseado:{perfil.indeseado}</p>
            <p>Estilo de dieta:{perfil.dieta}</p>
            <p>Tipo de cocina:{perfil.cocina_fav}</p>
            <p>Alergias:{perfil.alergia}</p>
        </div>

        
        <Link to ={ "/navbar"}>
        <Button variant="danger">Volver</Button>
        </Link>
     
    </div>
  );
}
