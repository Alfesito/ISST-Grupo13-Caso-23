import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./componentes/Header";
import Spiner from "./componentes/Spiner";
import SearchPage from "./componentes/SearchPage";
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

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);


  const callServer = async ()=>{

    if(true)    {

      try {
        const req= await fetch(
            API.URL_search+'?app_id='+API.ID_search+'&app_key='+API.KEY_search
        )
        const res= await req.json();
        setProducts(res.products)
        console.log("server-true")
      } catch (error) {
        console.log(error);
      }

    }
    else{
      console.log("server-false")

      setProducts(mockdata.products)
    }
  }


  

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

          <Route path="/searchpage/" element={<SearchPage theproducts={products} />} />

          <Route path="/products/:productId" element={<Producto theproducts={products}/> }/>
          <Route path="*" element={<NotFound />} />

      </Routes>
      
    </div>

  );
}

export default App;
