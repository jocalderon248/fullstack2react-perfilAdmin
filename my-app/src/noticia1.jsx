import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/main.css";
import "./styles/CssRegistro.css";
import "./styles/CssBlog.css";

export default function Noticia() {
  const navigate = useNavigate();

  return (
    <div className="img-fondo2">
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-card">
            
            <div className="blog-img">
              <img
                src="public/images/noticia01.jpg"
                alt="Colapso en tiendas digitales tras el lanzamiento de Silksong"
                className="blog-image"
              />
            </div>

            <div className="blog-content">
              <h2 className="blog-title">
                Colapso en tiendas digitales tras el lanzamiento de Hollow Knight: Silksong
              </h2>

              <div className="blog-desc">
                <p>
                  El tan esperado lanzamiento de <strong>Hollow Knight: Silksong</strong> provocó un colapso temporal
                  en varias tiendas digitales alrededor del mundo. Plataformas como Steam, Nintendo
                  eShop y Xbox Store reportaron caídas parciales y problemas de acceso debido a la
                  masiva cantidad de usuarios intentando descargar el título de Team Cherry al mismo
                  tiempo.
                </p>

                <p>
                  La comunidad llevaba años aguardando la llegada del juego, lo que generó un nivel
                  de tráfico inusual. En redes sociales, miles de jugadores compartieron capturas de
                  errores y tiempos de espera, mientras que algunos servicios permanecieron
                  intermitentes por varias horas.
                </p>

                <p>
                  Las compañías responsables de las plataformas aseguraron que los servicios se
                  fueron restableciendo de manera progresiva y que la situación estuvo directamente
                  relacionada con la demanda histórica que generó Silksong.
                </p>
              </div>

              <button
                className="blog-btn"
                onClick={() => navigate("/blog")}
              >
                Volver al Blog
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

