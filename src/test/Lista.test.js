import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import Lista from "../componentes/search/Lista";

describe("Lista component", () => {
  const mockedParsed = [
    { food: { foodId: 1, image: "image1.png", label: "Food 1", quantity: "200" } },
    { food: { foodId: 2, image: "image2.png", label: "Food 2", quantity: "150" } },
  ];

  const mockedProducts = [
    { food: { foodId: 3, image: "image3.png", label: "Food 3", category: "Category 1" } },
    { food: { foodId: 4, image: "image4.png", label: "Food 4", category: "Category 2" } },
  ];

  test("renders component with parsed and products data", () => {
    const { getByText, getAllByRole } = render(
      <Lista theparsed={mockedParsed} theproducts={mockedProducts} />
    );

    // Check that theparsed data is rendered
    const parsedItems = getAllByRole("img");
    expect(parsedItems.length).toBe(mockedParsed.length);

    // Check that theproducts data is rendered
    const productItems = getAllByRole("heading");
    expect(productItems.length).toBe(mockedProducts.length);
  });

  test("clicks on 'Añadir' button should call handleAñadir function", () => {
    const handleAñadirMock = jest.fn();
    const { getByText } = render(
      <Lista
        theparsed={mockedParsed}
        theproducts={mockedProducts}
        handleAñadir={handleAñadirMock}
      />
    );

    // Click on 'Añadir' button
    const addButton = getByText("Añadir");
    fireEvent.click(addButton);

    // Check that handleAñadirMock function is called
    expect(handleAñadirMock).toHaveBeenCalledTimes(1);
  });

  test("displays 'Relacionado:' when theparsed and theproducts data are available", () => {
    const { getByText } = render(
      <Lista theparsed={mockedParsed} theproducts={mockedProducts} />
    );

    // Check that 'Relacionado:' text is displayed
    const relacionadoText = getByText("Relacionado:");
    expect(relacionadoText).toBeInTheDocument();
  });

  test("does not display 'Relacionado:' when theparsed or theproducts data are not available", () => {
    const { queryByText } = render(<Lista theparsed={[]} theproducts={[]} />);

    // Check that 'Relacionado:' text is not displayed
    const relacionadoText = queryByText("Relacionado:");
    expect(relacionadoText).toBeNull();
  });
});
