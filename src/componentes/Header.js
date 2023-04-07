import React from 'react'
import logo from '../logo192.png';

function Header() {
  return (
    <div id='cabecera' data-testid="cabecera">
        <img className='logo' src={logo} alt="hola"></img>
        <h3 className='mensaje' data-testid="mensaje"> NutriApp </h3>
    </div>
  )
}

export default Header