import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


function NotFound() {
  const[linea,setLinea]= useState()
  useEffect(()=>{
    setLinea(<><h5 id="info">Ruta no encontrada</h5><br></br><Link to="/">
        <Button id="volver" variant='danger'>
          Volver
        </Button>
      </Link></>)
  },[])
 
  return (
    <div>
        <h5 id="info">Ruta no encontrada</h5>
        <br></br>

    <Link to="/">
        <Button id="volver"variant='danger'>
        Volver
        </Button>
    </Link>
    </div>
  )
}

export default NotFound