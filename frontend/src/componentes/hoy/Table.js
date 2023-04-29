import React from "react";

function Table(props) {

  const comidas = props.comidas;
  const nutriscore = props.nutriscore;
  
  return (
    <div>
      <div class="table-title">
        <h3>Data Table</h3>
      </div>
      <table id = "mi-tabla" class="table-fill">
        <thead>
          <tr>
            <th class="primera-fila">Producto</th>
            <th class="primera-fila">NutriScore</th>
            <th class="primera-fila">KCal</th>
            <th class="primera-fila">Proteinas</th>
            <th class="primera-fila">Grasas</th>
            <th class="primera-fila">Carbohidratos</th>
            <th class="primera-fila">Fibra</th>
          </tr>
        </thead>
        <tbody class="table-hover">
          {comidas.map(producto => (
            <tr>
            <td class="text-left">{producto.comida}</td>
            <td class="text-left">{nutriscore}</td>
            <td class="text-left">{producto.kcal.toFixed(2)}</td>
            <td class="text-left">{producto.proteina.toFixed(2)}</td>
            <td class="text-left">{producto.grasa.toFixed(2)}</td>
            <td class="text-left">{producto.carb.toFixed(2)}</td>
            <td class="text-left">{producto.fibra === null ? 0 : producto.fibra.toFixed(2)}</td>
          </tr>
          ))
          }
          
          
        </tbody>
      </table>
    </div>
  );
}

export default Table;
