import React from "react";

function Table(props) {
  const comidas = props.comidas;
  const nutriScoreArray = props.nutriscorearray;

  function getNutriClass(score) {
    switch (score) {
      case "A":
        return "nutriscore-a";
      case "B":
        return "nutriscore-b";
      case "C":
        return "nutriscore-c";
      case "D":
        return "nutriscore-d";
      case "E":
        return "nutriscore-e";
      default:
        return "";
    }
  }

  return (
    <div>
      <div class="table-title">
        <h3>Data Table</h3>
      </div>
      <table id="mi-tabla" class="table-fill">
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
          {comidas.map((producto, index) => (
            <tr>
              <td class="text-left">{producto.comida}</td>
              <td class={`text-center ${getNutriClass(nutriScoreArray[index])}`}>
                {nutriScoreArray[index]}
              </td>
              <td class="text-center">{producto.kcal.toFixed(1)}</td>
              <td class="text-center">{producto.proteina.toFixed(1)}</td>
              <td class="text-center">{producto.grasa.toFixed(1)}</td>
              <td class="text-center">{producto.carb.toFixed(1)}</td>
              <td class="text-center">
                {producto.fibra === null ? 0 : producto.fibra.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
