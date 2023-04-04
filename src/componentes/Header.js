import React from 'react'
import logo from '../logo192.png';

function Header() {
  return (
    <div id='cabecera'>
        <img className='logo' src={logo} alt="hola"></img>
        <h3 className='mensaje'> NutriApp </h3>
    </div>
  )
}

export default Header