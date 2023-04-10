import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ListaRecipe from "../componentes/recipe/ListaRecipe";

// Mock del contexto de MyContext
jest.mock("../../context/MyContext", () => ({
  MyContext: {
    Consumer: ({ children }) => children({
      handleAlergiaRecipe: jest.fn()
    })
  }
}));

describe("ListaRecipe", () => {
  const mockProducts = [
    {
      recipe: {
        uri: "1",
        label: "Recipe 1",
        image: "recipe1.jpg",
        source: "Source 1",
        ingredientLines: ["Ingredient 1", "Ingredient 2"],
        healthLabels: ["Label 1", "Label 2"]
      }
    },
    {
      recipe: {
        uri: "2",
        label: "Recipe 2",
        image: "recipe2.jpg",
        source: "Source 2",
        ingredientLines: ["Ingredient 3", "Ingredient 4"],
        healthLabels: ["Label 3", "Label 4"]
      }
    }
  ];

  it("renders the correct number of cards with recipe information", () => {
    const { getByText, getAllByTestId } = render(
      <ListaRecipe theproducts={mockProducts} />
    );

    const cardTitles = getAllByTestId("card-title");
    expect(cardTitles.length).toBe(mockProducts.length);
    expect(getByText("Recipe 1")).toBeInTheDocument();
    expect(getByText("Recipe 2")).toBeInTheDocument();
  });

  it("calls handleAñadir function with correct arguments when 'Añadir' button is clicked", () => {
    const mockHandleAlergiaRecipe = jest.fn();
    const { getByText } = render(
      <ListaRecipe
        theproducts={mockProducts}
        handleAlergiaRecipe={mockHandleAlergiaRecipe}
      />
    );

    const addButton1 = getByText("Añadir", { exact: false });
    fireEvent.click(addButton1);
    expect(mockHandleAlergiaRecipe).toHaveBeenCalledWith(
      "Recipe 1",
      ["Ingredient 1", "Ingredient 2"],
      ["Label 1", "Label 2"]
    );

    const addButton2 = getByText("Añadir", { exact: false });
    fireEvent.click(addButton2);
    expect(mockHandleAlergiaRecipe).toHaveBeenCalledWith(
      "Recipe 2",
      ["Ingredient 3", "Ingredient 4"],
      ["Label 3", "Label 4"]
    );
  });
});
