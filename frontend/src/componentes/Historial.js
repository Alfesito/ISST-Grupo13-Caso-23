import Naavbar from "./Naavbar";
import React, { useState, useEffect } from "react";

function Historial() {

    const [comidas, setComidas] = useState([]);
    const [correo, setCorreo] = useState(sessionStorage.getItem('correo'));

    useEffect(() => {

        async function obtenerComidas() {
            const correoActual = sessionStorage.getItem('correo');
            setCorreo(correoActual)
            //`/api/ingestas/${correo}`
            await fetch(`/api/ingestas/${correo}`)
            .then(response => response.json())
            .then(data => setComidas(data) || console.log(data))
            .catch(error => console.error(error));
        }
        obtenerComidas();
        console.log(correo)
        console.log(comidas)
    }, []);

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
                        </tr>
                    </thead>
                    <tbody>
                        {comidas && comidas.map(ingesta => (
                            <tr key={ingesta.fecha}>
                                <td>{ingesta.comida}</td>
                                <td>{ingesta.kcal}</td>
                                <td>{ingesta.proteina}</td>
                                <td>{ingesta.carb}</td>
                                <td>{ingesta.grasa}</td>
                                <td>{ingesta.fibra}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}
export default Historial;
