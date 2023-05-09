import { Button } from "react-bootstrap";
import Naavbar from "./Naavbar";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

function Historial() {

    const [comidas, setComidas] = useState([]);
    const { correo } = useContext(MyContext);  
    const { setLimite } = useContext(MyContext);


    async function obtenerComidas() {
        await fetch(`/api/ingestas/${correo}`)
            .then(response => response.json())
            .then(data => setComidas(data.reverse()) || console.log(data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        obtenerComidas();
    }, []);

    async function eliminarIngesta(id) {

        setLimite(true)
        await fetch(`/api/eliminar/ingestas/${id}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "DELETE",
        })
        .then(function (res) {
            // Eliminar la ingesta del array comidas
            const nuevasComidas = comidas.filter(ingesta => ingesta.id !== id);
            setComidas(nuevasComidas);
        })
        .catch(function (res) { console.log(res) })
    }


    return (
        <>
            <Naavbar />
            <div className="tablaHistorial">
                <table>
                    <thead>
                        <tr>
                            <th>Comida</th>
                            <th>NutriScore</th>
                            <th>Kcal</th>
                            <th>Proteina</th>
                            <th>Carb</th>
                            <th>Grasa</th>
                            <th>Fibra</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comidas && comidas.map(ingesta => (
                            <tr key={ingesta.id}>
                                <td>{ingesta.comida}</td>
                                <td>{ingesta.nutriscore}</td>
                                <td>{ingesta.kcal.toFixed(2)}</td>
                                <td>{ingesta.proteina.toFixed(2)}</td>
                                <td>{ingesta.carb.toFixed(2)}</td>
                                <td>{ingesta.grasa.toFixed(2)}</td>
                                <td>{ingesta.fibra === null ? 0 : ingesta.fibra.toFixed(2)}</td>
                                <td>{ingesta.fecha}</td>
                                <td><Button id={ingesta.id} variant="danger" onClick={() => eliminarIngesta(ingesta.id)}>Eliminar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}
export default Historial;
