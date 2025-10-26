import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CssRegistro.css";
import "./styles/main.css";
import "./styles/detalleproducto.css";
import "./styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div id="page-wrapper" className="is-preload homepage">

      {/* Home */}
      <div className="img-fondo">
        <div className="wrapper">
          <div className="contenedor-flex">
            <div className="cajilla-box">
              <h1>
                <strong>Tienda De Juegos GameCloud</strong>
              </h1>
              <h3>
                Somos una tienda de juegos nacida en el año 2025, donde buscamos
                entregarte los mejores precios en videojuegos, con la mejor calidad, En Chile.
              </h3>
              <a className="button"  onClick={() => navigate('/productos')} role="button">
                Ir a productos
              </a>
            </div>

            <div className="cajilla2-box">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/6XGeJwsUP9c"
                  title="Video del día"
                  allowFullScreen
                ></iframe>
              </div>
              <p>
                <strong>Video Del Día</strong>
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="container">
            <div className="row">
              {[
                {
                  img: "public/images/pic01.jpg",
                  title: "Persona 3: Reload",
                  text: "Persona 3 Reload es un remake del RPG de 2006 Persona 3.",
                },
                {
                  img: "public/images/pic02.jpg",
                  title: "God of War: Ragnarok",
                  text: "Secuela de God Of War, donde volvemos a ser Kratos.",
                },
                {
                  img: "public/images/pic03.jpg",
                  title: "SilkSong",
                  text: "Secuela de Hollow Knight, Controlamos a Hornet.",
                },
                {
                  img: "public/images/pic04.jpg",
                  title: "Lego: Batman",
                  text: "Vuelves Como el Caballero de la noche en forma de Lego.",
                },
                {
                  img: "public/images/pic05.jpg",
                  title: "Elden Ring",
                  text: "Nuevo Entrega de FromSoftware, Juego Tipo DarkSouls.",
                },
                {
                  img: "public/images/pic06.jpg",
                  title: "Sekiro",
                  text: "Es un Japón ficticio de finales del siglo XVI Reinado por la violencia.",
                },
              ].map(({ img, title, text }, i) => (
                <div className="col-sm" key={i}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={img} className="card-img-top" alt={title} />
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <p className="card-text">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
