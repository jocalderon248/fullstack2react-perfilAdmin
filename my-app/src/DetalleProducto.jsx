import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import "./styles/main.css";
import "./styles/detalleproducto.css";

const products = [
  {
    nombre: "Persona 3 Reload",
    comentario:
      "Juego JRPG, Para PC, XBOX y PS4/PS5. Remake de Persona 3 con gráficos y ajustes modernos.",
    precio: 18500,
    imagen: "/images/pic01.jpg", 
  },
  {
    nombre: "God of War Ragnarok",
    comentario:
      "Secuela de God of War (2018) que continúa la historia de Kratos y Atreus.",
    precio: 25500,
    imagen: "/images/pic02.jpg", 
  },
  {
    nombre: "SilkSong",
    comentario:
      "Secuela de Hollow Knight. Controlas a Hornet en un reino nuevo y desafiante.",
    precio: 10500,
    imagen: "/images/pic03.jpg",
  },
  {
    nombre: "Lego BatMan",
    comentario:
      "Juego de aventuras protagonizado por Batman y Robin en versión LEGO.",
    precio: 5500,
    imagen: "/images/pic04.jpg",
  },
  {
    nombre: "Elden Ring",
    comentario:
      "Mundo abierto de fantasía oscura creado por FromSoftware con jefes y exploración profunda.",
    precio: 30000,
    imagen: "/images/pic05.jpg", 
  },
  {
    nombre: "Sekiro",
    comentario:
      "Acción desafiante ambientada en un Japón ficticio, desarrollada por FromSoftware.",
    precio: 22000,
    imagen: "/images/pic06.jpg", 
  },
  {
    nombre: "Call Of Duty BO2",
    comentario:
      "Entrega clásica de la saga Call of Duty con modo campaña y multijugador.",
    precio: 19990,
    imagen: "/images/blackOPs.jpg", 
  },
  {
    nombre: "2K26",
    comentario:
      "Nueva edición del simulador de la NBA con mejoras en jugabilidad y modos.",
    precio: 40000,
    imagen: "/images/2K26.jpg", 
  },
  {
    nombre: "No Man's Sky",
    comentario:
      "Videojuego de exploración y supervivencia con universo generado proceduralmente.",
    precio: 15000,
    imagen: "/images/nomansky.jpg", 
  },
];

export default function DetalleProducto() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // admitir tanto ruta /detalle-producto/:index como query string ?index=
    let idx = params.index;
    if (idx === undefined || idx === null) {
      const qs = new URLSearchParams(location.search);
      idx = qs.get("index");
    }
    const i = Number(idx);
    if (!Number.isNaN(i) && i >= 0 && i < products.length) {
      setProduct(products[i]);
    } else {
      setProduct(null);
    }
  }, [params.index, location.search]);

  const agregarAlCarrito = (i) => {
    if (i < 0 || i >= products.length) return;
    const nuevoCarrito = [...carrito, products[i]];
    setCarrito(nuevoCarrito);
    alert(`Producto agregado: ${products[i].nombre}. Total en carrito: ${nuevoCarrito.length}`);
  };

  if (!product) {
    return (
      <div id="page-wrapper" className="is-preload homepage">
        <div className="wrapper">
          <h2>Producto no encontrado</h2>
          <button onClick={() => navigate(-1)}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div id="page-wrapper" className="is-preload homepage">
      <div className="img-fondo">
        <div className="wrapper">
          <div className="contenedor-flex">
            <div className="cajilla-box">
              <img
                id="imagen-principal"
                src={product.imagen} 
                alt={product.nombre}
                style={{ maxWidth: "100%", height: 310 }}
              />
            </div>
            <div className="cajilla2-box">
              <h5 id="titulo-principal">{product.nombre}</h5>
              <p id="comentario-principal">{product.comentario}</p>
              <strong>
                <p id="precio-principal">${typeof product.precio === "number" ? product.precio.toLocaleString() : product.precio}</p>
              </strong>
              <div style={{ marginTop: 20 }}>
                <button className="btn btn-primary" onClick={() => agregarAlCarrito(products.indexOf(product))}>
                  Agregar al carrito
                </button>
                <button className="btn btn-secondary" style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
                  Volver
                </button>
              </div>
            </div>
          </div>

          <div className="container" style={{ marginTop: 40 }}>
            <h3>Productos relacionados</h3>
            <div className="row" id="productos-container">
              {products.map((p, i) => (
                <div className="col-sm mb-3" key={i}>
                  <Link to={`/detalle-producto/${i}`} className="card" style={{ width: "18rem", cursor: "pointer" }}>
                    <img src={p.imagen} className="card-img-top" alt={p.nombre} />
                    <div className="card-body">
                      <h5 className="card-title">{p.nombre}</h5>
                      <p className="card-text">{p.comentario}</p>
                      <p>
                        <strong>${typeof p.precio === "number" ? p.precio.toLocaleString() : p.precio}</strong>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

