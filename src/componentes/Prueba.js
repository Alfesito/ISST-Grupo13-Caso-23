import React from "react";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
export default function Prueba() {
  return (
    <div>
      Prueba
      <Link to="/">
        <Button id="volver" variant="danger">
          Volver
        </Button>
      </Link>
    </div>
  );
}
