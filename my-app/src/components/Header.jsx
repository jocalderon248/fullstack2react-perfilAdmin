import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

export default function Header() {
  return (
    <div id="header-wrapper">
      <header id="header" className="container">
        {/* Logo */}
        <div id="logo">
          <h1>
            <Link to="/">
              <img src="../images/Logo_de_GameCloud.png" alt="GameCloud Logo" />
            </Link>
          </h1>
        </div>

        {/* Carrito */}
        <div className="carrito-container">
          <div id="logo">
            <Link to="/carrito">
              <img 
                src="../images/carrito-removebg-preview.png" 
                alt="Carrito" 
                style={{cursor: 'pointer'}}
              />
            </Link>
          </div>
          <span id="contador">0</span>
        </div>

        {/* Nav */}
        <nav id="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/inicio-sesion">Inicio Sesion</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
