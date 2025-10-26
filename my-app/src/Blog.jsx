import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CssRegistro.css";
import "./styles/main.css";
import "./styles/CssBlog.css";

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="img-fondo2">
      <section>
        <div className="blog-container">
          <div className="blog-card">
            <div className="blog-content">
              <div className="blog-title">
                Colapso en tiendas digitales tras el lanzamiento de Hollow Knight: Silksong
              </div>
              <div className="blog-desc">
                La comunidad llevaba años aguardando la llegada del juego, lo que generó un nivel de tráfico inusual. En redes sociales, miles de jugadores compartieron capturas de errores y tiempos de espera, mientras que algunos servicios permanecieron intermitentes por varias horas.
              </div>
              <button
                className="blog-btn"
                onClick={() => navigate('/noticia1')}
              >
                VER CASO
              </button>
            </div>
            <div className="blog-img">
              <img
                src="public/images/noticia01.jpg"
                alt="Imagen caso curioso"
                style={{ width: "100%", maxWidth: "487px", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="blog-container">
          <div className="blog-card">
            <div className="blog-content">
              <div className="blog-title">
                Polémica en torno a Metal Gear Solid Δ: Snake Eater por su uso del Unreal Engine 5
              </div>
              <div className="blog-desc">
                El remake Metal Gear Solid Δ: Snake Eater ha generado controversia en la comunidad de jugadores tras mostrarse nuevos avances desarrollados con Unreal Engine 5.
              </div>
              <button
                className="blog-btn"
                onClick={() => navigate('/noticia2')}
              >
                VER CASO
              </button>
            </div>
            <div className="blog-img">
              <img
                src="public/images/noticia02.jpg"
                alt="Imagen caso curioso"
                style={{ width: "100%", maxWidth: "487px", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
