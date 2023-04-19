import * as React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Alimentacion from "./componentes/search/Alimentacion";
import { useState } from "react";
import { useEffect } from "react";
import { mockdata } from "./constants/products";
import { mockdatarecipe } from "./constants/recipe";

import Producto from "./componentes/search/Producto";
import NotFound from "./componentes/NotFound";
import API from "./constants/data";
import { Route, Routes } from "react-router-dom";

import Naavbar from "./componentes/Naavbar";
import Prueba from "./componentes/Prueba";
import LandingPage from "./componentes/LandingPage";
import LogIn from "./componentes/LogIn";
import SignIn from "./componentes/SignIn";
import Perfil from "./componentes/Perfil";
import Recipe from "./componentes/recipe/Recipe";
import Recomendaciones from "./componentes/recipe/Recomendaciones";

import { MyContext } from "./context/MyContext";
import { useContext } from "react";

function App() {
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [products, setProducts] = useState([]); // Estado para los productos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [parsed, setParsed] = useState([]); // Estado para los datos analizados
  const [recipe, setRecipe] = useState([]); // Estado para las recetas

  const searchAPI = async () => {
    if (API.API_connection) { // Comprobar si la conexión a la API está activa
      try {
        setProducts([]); // Reiniciar los productos
        setParsed([]); // Reiniciar los datos analizados
        const req = await fetch(
          API.URL_search +
            "?app_id=" +
            API.ID_search +
            "&app_key=" +
            API.KEY_search +
            "&ingr=" +
            searchTerm
        ); // Realizar petición a la API de búsqueda
        const res = await req.json(); // Obtener la respuesta en formato JSON
        setParsed(res.parsed); // Actualizar los datos analizados
        setProducts(res.hints); // Actualizar los productos
      } catch (error) {
        console.log(error);
      }
    } else {
      setProducts(mockdata.hints); // Establecer datos de muestra en caso de conexión desactivada
    }
  };

  const handleInputChange = (value) => {
    setSearchTerm(value); // Manejar cambios en el término de búsqueda
  };

  const handleButtonClick = () => {
    searchAPI();
    recipeAPI(); // Manejar clic en botón de búsqueda
  };

  const { health, setHealth } = useContext(MyContext); // Contexto para el estado de salud
  const { diet, setDiet } = useContext(MyContext); // Contexto para el estado de dieta
  const { cuisine, setCuisine } = useContext(MyContext); // Contexto para el estado de cocina

  const recipeAPI = async () => {
    if (API.API_connection) { // Comprobar si la conexión a la API está activa
      try {
        const busqueda = searchTerm !== "" ? searchTerm : "rice"; // Obtener término de búsqueda, si está vacío, establecer "rice" como valor predeterminado
        const dieta = diet !== "" ? "&diet=" + diet : ""; // Obtener dieta seleccionada, si no está seleccionada, no incluir en la URL
        const salud = health !== "" ? "&health=" + health : ""; // Obtener estado de salud seleccionado, si no está seleccionado, no incluir en la URL
        const cocina = cuisine !== "" ? "&cuisineType=" + cuisine : ""; // Obtener tipo de cocina seleccionado, si no está seleccionado, no incluir en la URL
        const req = await fetch(
          API.URL_recipe +
            "?type=public&q=" +
            busqueda +
            "&app_id=" +
            API.ID_recipe +
            "&app_key=" +
            API.KEY_recipe +
            dieta +
            salud +
            cocina
        ); // Realizar petición a la API de recetas
        const res = await req.json(); // Obtener la respuesta en formato JSON
        setRecipe(res.hits); // Actualizar las recetas
      } catch (error) {
        console.log(error); // Maneja errores en caso de haberlos
      }
    } else {
      setRecipe(mockdatarecipe.hits); // Utiliza datos de muestra en caso de no haber conexión con la API
    }
  };

  const handleSelectChangeDiet = (value) => {
    setDiet(value);
  };

  const handleSelectChangeHealth = (value) => {
    setHealth(value);
  };

  const handleSelectChangeCuisine = (value) => {
    setCuisine(value);
  };

  useEffect(() => {
    // useEffect para manejar la carga inicial de la página
    searchAPI(); // Llama a la función searchAPI() al cargar la página
    recipeAPI(); // Llama a la función recipeAPI() al cargar la página
    setLoading(false); // Actualiza el estado de carga a false al cargar la página
  }, []);


  return (
    
      <div className="App">
        <Routes>
          <Route path="/" exact={true} element={<LandingPage />}></Route>
          <Route path="/navbar" exact={true} element={<Naavbar />}></Route>
          <Route path="/login" exact={true} element={<LogIn />}></Route>
          <Route path="/signin" exact={true} element={<SignIn />}></Route>
          <Route path="/prueba" element={<Prueba />}></Route>
          <Route path="/perfil" element={<Perfil />}></Route>
          <Route
            path="/alimentacion"
            element={
              <Alimentacion
                theproducts={products}
                onInputChange={handleInputChange}
                onButtonClick={handleButtonClick}
                theparsed={parsed}
              />
            }
          ></Route>
          <Route
            path="/recomendaciones"
            element={
              <Recomendaciones
                theproducts={recipe}
                onInputChange={handleInputChange}
                onButtonClick={handleButtonClick}
                onSelectChangeDiet={handleSelectChangeDiet}
                onSelectChangeHealth={handleSelectChangeHealth}
                onSelectChangeCuisine={handleSelectChangeCuisine}
              />
            }
          ></Route>
          <Route
            path="/products/:productId"
            element={<Producto theproducts={products} theparsed={parsed} />}
          />
          <Route
            path="/recipe/:recipeId"
            element={<Recipe theproducts={recipe} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    
  );
}

export default App;
