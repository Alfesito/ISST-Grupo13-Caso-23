import Naavbar from "./Naavbar"
import SearchPage from "./SearchPage"
import React from "react"

function Alimentacion(props) {
    return (
      <div>
        <Naavbar/>
        <SearchPage theproducts={props.theproducts} onInputChange={props.onInputChange} onButtonClick={props.onButtonClick}></SearchPage>
      </div>
    )
  }
  
  export default Alimentacion