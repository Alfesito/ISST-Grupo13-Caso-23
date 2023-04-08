import * as React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./componentes/Header";
import Alimentacion from "./componentes/search/Alimentacion";
import { useState } from "react";
import { useEffect } from "react";
import { mockdata } from "./constants/products";
import { mockdatarecipe } from "./constants/recipe";

import { Routes, Route } from "react-router-dom";
import Producto from "./componentes/search/Producto";
import NotFound from "./componentes/NotFound";
import API from "./constants/data";

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
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [parsed, setParsed] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const searchAPI = async () => {
    if (API.API_connection) {
      try {
        setProducts([]);
        setParsed([]);
        const req = await fetch(
          API.URL_search +
            "?app_id=" +
            API.ID_search +
            "&app_key=" +
            API.KEY_search +
            "&ingr=" +
            searchTerm
        );
        const res = await req.json();
        setParsed(res.parsed);
        setProducts(res.hints);
        //Elimina el primer objeto de res.hints ya que se repite con res.parsed
        // if(res.text !== ""){
        //   const obj = await res.hints
        //   const firstPropName = await Object.keys(obj)[0];
        //   await delete obj[firstPropName];
        //   setProducts(obj)
        // }else{
        //   setProducts(res.hints)
        // }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("server-false");
      setProducts(mockdata.hints);
    }
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const handleButtonClick = () => {
    searchAPI();
    recipeAPI();
  };

  const{ health,setHealth }= useContext(MyContext);
  const {diet, setDiet} = useContext(MyContext);
  const {cuisine, setCuisine} = useContext(MyContext);

  const recipeAPI = async () => {
    if (API.API_connection) {
      try {
        const busqueda = searchTerm !== "" ? searchTerm : "rice";
        const dieta = diet !== "" ? "&diet=" + diet : "";
        const salud = health !== "" ? "&health=" + health : "";
        const cocina = cuisine !== "" ? "&cuisineType=" + cuisine : "";
        const req = await fetch(
          // 'https://api.edamam.com/api/recipes/v2?type=public&q=rice&app_id=d37da41f&app_key=1f068730881ead6d9950d93dd720ab2c&diet=balanced&health=egg-free&cuisineType=Asian'
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
        );
        const res = await req.json();
        setRecipe(res.hits);
        console.log(
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
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setRecipe(mockdatarecipe.hits);
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
    async function recogeDatos() {
      await searchAPI();
      await recipeAPI();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    recogeDatos();
  }, []);

  return (
    
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/navbar" element={<Naavbar />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
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
