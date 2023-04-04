import * as React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./componentes/Header";
import Alimentacion from "./componentes/Alimentacion";
import { useState } from "react";
import { useEffect } from "react";
import { mockdata } from "./constants/products";

import { Routes, Route } from "react-router-dom";
import Producto from "./componentes/Producto";
import NotFound from "./componentes/NotFound";
import API from "./constants/data";

import Naavbar from "./componentes/Naavbar";
import Prueba from "./componentes/Prueba";
import LandingPage from "./componentes/LandingPage";
import LogIn from "./componentes/LogIn";
import SignIn from "./componentes/SignIn";
import Perfil from "./componentes/Perfil";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [parsed, setParsed] = useState([])

  const callServer = async ()=>{

    if(API.API_connection){
      try {
        setProducts([])
        setParsed([])
        const req= await fetch(
            API.URL_search+'?app_id='+API.ID_search+'&app_key='+API.KEY_search+'&ingr='+searchTerm
        )
        const res= await req.json();
        setParsed(res.parsed)
        setProducts(res.hints)
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
    }
    else{
      console.log("server-false")
      setProducts(mockdata.hints)
    }
  }

  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const handleButtonClick = () => {
    callServer();
  };

  useEffect(() => {
    async function recogeDatos() {
      await callServer();

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    recogeDatos();
  }, []);

  return (

    <div className="App">
      
      <Header />
       
      {/* {loading ? <Spiner /> : <Routes> 
        <Route path="/" element={<Naavbar/>}></Route>
        <Route path="/prueba" element={<Prueba/>} ></Route>

        <Route path="/searchpage/" element={<SearchPage theproducts={products} />} />

        <Route path="/products/:productId" element={<Producto theproducts={products}/> }/>
        <Route path="*" element={<NotFound />} />

      </Routes>} */}
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/navbar" element={<Naavbar/>}></Route>
          <Route path="/login" element={<LogIn/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/prueba" element={<Prueba/>} ></Route>
        
          <Route path="/perfil" element={<Perfil/>} ></Route>
          


          <Route path="/alimentacion" element={<Alimentacion theproducts={products} onInputChange={handleInputChange} onButtonClick={handleButtonClick} theparsed={parsed}/>}></Route>

          <Route path="/products/:productId" element={<Producto theproducts={products} theparsed={parsed}/> }/>
          <Route path="*" element={<NotFound />} />

      </Routes>
      
    </div>

  );
}

export default App;
