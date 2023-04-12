import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import Lista from "../componentes/search/Lista";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../context/MyContext";

describe("Lista component", () => {
  const mockedParsed = [
    { food: { foodId: 1, image: "image1.png", label: "Food 1", quantity: "200" } },
    { food: { foodId: 2, image: "image2.png", label: "Food 2", quantity: "150" } },
  ];

  const mockedProducts = [
    { food: { foodId: 3, image: "image3.png", label: "Food 3", category: "Category 1" } },
    { food: { foodId: 4, image: "image4.png", label: "Food 4", category: "Category 2" } },
  ];

  test("renders component with products data", () => {
    const { getByTestId } = render(
      <React.StrictMode>
        <BrowserRouter>
          <ContextProvider>
            <Lista
              theparsed={mockedParsed}
              theproducts={mockedProducts}
            />
          </ContextProvider></BrowserRouter></React.StrictMode>
    );

    expect(getByTestId('lista')).toHaveTextContent('Food 3');
    expect(getByTestId('lista')).toHaveTextContent('Category 2');

  });

  test("renders component with parsed data", () => {
    const { getByTestId } = render(
      <React.StrictMode><BrowserRouter><ContextProvider>
        <Lista
          theparsed={mockedParsed}
          theproducts={mockedProducts}
        />
      </ContextProvider></BrowserRouter></React.StrictMode>

    );

    expect(getByTestId('lista')).toHaveTextContent('Food 1');
    expect(getByTestId('lista')).toHaveTextContent('Food 2');
  });

  test("displays 'Relacionado:' when theparsed and theproducts data are available", () => {
    const { getByText } = render(
      <React.StrictMode><BrowserRouter><ContextProvider>
        <Lista
          theparsed={mockedParsed}
          theproducts={mockedProducts}
        />
      </ContextProvider></BrowserRouter></React.StrictMode>
    );

    // Check that 'Relacionado:' text is displayed
    const relacionadoText = getByText("Relacionado:");
    expect(relacionadoText).toBeInTheDocument();
  });

  test("does not display 'Relacionado:' when theparsed or theproducts data are not available", () => {
    const { queryByText } = render(
      <React.StrictMode><BrowserRouter><ContextProvider>
        <Lista
          theparsed={[]}
          theproducts={[]}
        />
      </ContextProvider></BrowserRouter></React.StrictMode>
      );

    // Check that 'Relacionado:' text is not displayed
    const relacionadoText = queryByText("Relacionado:");
    expect(relacionadoText).toBeNull();
  });
});
