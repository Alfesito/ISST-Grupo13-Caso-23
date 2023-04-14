import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ListaRecipe from "../componentes/recipe/ListaRecipe";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../context/MyContext";

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
    const { getByTestId } = render(
      <React.StrictMode><BrowserRouter><ContextProvider>
        <ListaRecipe theproducts={mockProducts} />
      </ContextProvider></BrowserRouter></React.StrictMode>
    );
    expect(getByTestId('lista')).toHaveTextContent('Recipe 1');
    expect(getByTestId('lista')).toHaveTextContent('Source 2');
  });

  it("renders the correct recipe information with healthLabels", () => {

    const { getByTestId } = render(
      <React.StrictMode><BrowserRouter><ContextProvider>
        <ListaRecipe theproducts={mockProducts} />
      </ContextProvider></BrowserRouter></React.StrictMode>
    );
    expect(getByTestId('lista')).toHaveTextContent('Recipe 1');
    expect(getByTestId('lista')).toHaveTextContent('Source 2');
  });
});
