import React from "react";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
export default function Prueba() {
  return (
    <div>
      
      <Link to="/perfil"> </Link>
        
        <h1><b>Nombre de usuario:</b></h1>
        <div>
            <p>Altura:</p>
            <p>Peso:</p>
            <p>Objetivo diario calórico:</p>
            <p>Gusto culinario:</p>
        </div>

        
        <Link to ={ "/navbar"}>
        <Button variant="danger">Volver</Button>
        </Link>
     
    </div>
  );
}
