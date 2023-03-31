import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LogIn() {
  return (
    <div>
      LogIn
      <Link to="/">
        <Button id="volver" variant="danger">
          Volver
        </Button>
      </Link>
    </div>
  );
}
