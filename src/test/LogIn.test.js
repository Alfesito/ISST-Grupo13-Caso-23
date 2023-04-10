import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogIn from "../componentes/LogIn";

describe("LogIn component", () => {
  test("renders login form", () => {
    const { getByText, getByPlaceholderText } = render(<LogIn />);

    // Verifica que el título "Log in" esté presente
    const titleElement = getByText(/Log in/i);
    expect(titleElement).toBeInTheDocument();

    // Verifica que los campos de entrada de texto estén presentes
    const loginInput = getByPlaceholderText("login");
    expect(loginInput).toBeInTheDocument();
    const passwordInput = getByPlaceholderText("password");
    expect(passwordInput).toBeInTheDocument();

    // Verifica que el botón "Log In" esté presente
    const loginButton = getByText(/Log In/i);
    expect(loginButton).toBeInTheDocument();
  });

  test("submits login form", () => {
    const { getByText, getByPlaceholderText } = render(<LogIn />);

    // Ingresa datos en los campos de entrada de texto
    const loginInput = getByPlaceholderText("login");
    fireEvent.change(loginInput, { target: { value: "username" } });
    const passwordInput = getByPlaceholderText("password");
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Simula el envío del formulario
    const loginButton = getByText(/Log In/i);
    fireEvent.click(loginButton);

    // Verifica que se haya redirigido a /navbar
    const navbarLink = getByText(/Iniciar sesión/i);
    expect(navbarLink).toBeInTheDocument();
  });
});
