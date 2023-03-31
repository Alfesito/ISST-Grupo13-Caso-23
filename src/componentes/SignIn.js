import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function SignIn() {
  return (
    <div>
      SignIn
      <Link to="/">
        <Button id="volver" variant="danger">
          Volver
        </Button>
      </Link>
    </div>
  );
}
