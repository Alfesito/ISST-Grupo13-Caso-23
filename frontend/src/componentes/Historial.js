import { Button } from "react-bootstrap";
import Naavbar from "./Naavbar";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

function Historial() {

    const [comidas, setComidas] = useState([]);
    const { correo } = useContext(MyContext);    

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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Comida</th>
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
                                <td>{ingesta.kcal}</td>
                                <td>{ingesta.proteina}</td>
                                <td>{ingesta.carb}</td>
                                <td>{ingesta.grasa}</td>
                                <td>{ingesta.fibra}</td>
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
