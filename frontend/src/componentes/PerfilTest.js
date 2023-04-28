import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Perfil from "./Perfil";

// Mock del contexto para evitar errores de dependencias en las pruebas
jest.mock("../context/MyContext", () => ({
  MyContext: {
    Consumer: (props) => props.children({ correo: "test@example.com" }),
  },
}));

describe("Perfil Component", () => {
  test("Displays the user's data on load", async () => {
    const mockedData = {
      correo: "test@example.com",
      edad: 35,
      peso: 75.5,
      altura: 180.0,
      sexo: "hombre",
      indeseado: "nuez",
      alergia: "celiaco",
      dieta: "vegetariano",
      cocina_fav: "italiana",
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedData),
      })
    );
    render(<Perfil />);

    await waitFor(() => {
      expect(screen.getByText("Nombre de usuario:")).toBeInTheDocument();
      expect(screen.getByText(`Edad: ${mockedData.edad}`)).toBeInTheDocument();
      expect(screen.getByText(`Peso: ${mockedData.peso}`)).toBeInTheDocument();
      expect(screen.getByText(`Altura: ${mockedData.altura}`)).toBeInTheDocument();
      expect(screen.getByText(`Sexo: ${mockedData.sexo}`)).toBeInTheDocument();
      expect(screen.getByText(`Producto no deseado: ${mockedData.indeseado}`)).toBeInTheDocument();
      expect(screen.getByText(`Alergia: ${mockedData.alergia}`)).toBeInTheDocument();
      expect(screen.getByText(`Dieta: ${mockedData.dieta}`)).toBeInTheDocument();
      expect(screen.getByText(`Cocina favorita: ${mockedData.cocina_fav}`)).toBeInTheDocument();
    });
  });

  test("Modifies the user's data when clicking the 'Modificar' button", async () => {
    const mockedData = {
      correo: "test@example.com",
      edad: 35,
      peso: 75.5,
      altura: 180.0,
      sexo: "hombre",
      indeseado: "nuez",
      alergia: "celiaco",
      dieta: "vegetariano",
      cocina_fav: "italiana",
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedData),
      })
    );
    render(<Perfil />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Modificar"));
      expect(screen.getByPlaceholderText("Escriba su edad")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Peso en Kg")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Altura en cm")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Introduzca producto no deseado")).toBeInTheDocument();
      expect(screen.getByText("Guardar cambios")).toBeInTheDocument();
    });})
})