import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/main.css";
import "./styles/CssRegistro.css";
import "./styles/CssProducto.css";

import productosBase from "./utils/productosData";
import categoriasBase from "./utils/categoriasData";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Cargar productos
  useEffect(() => {
    const rawProducts = localStorage.getItem("app_products");
    if (rawProducts) setProductos(JSON.parse(rawProducts));
    else {
      setProductos(productosBase);
      localStorage.setItem("app_products", JSON.stringify(productosBase));
    }

    const rawCategorias = localStorage.getItem("app_categorias");
    if (rawCategorias) setCategorias(JSON.parse(rawCategorias));
    else {
      setCategorias(categoriasBase);
      localStorage.setItem("app_categorias", JSON.stringify(categoriasBase));
    }
  }, []);

  // Agregar al carrito
  const agregar = (id) => {
    const raw = localStorage.getItem("cart");
    let c = raw ? JSON.parse(raw) : [];
    const ex = c.find((i) => i.id === id);
    if (ex) ex.qty += 1;
    else c.push({ id: id, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(c));

    const cnt = document.getElementById("contador");
    if (cnt) cnt.textContent = c.reduce((s, i) => s + i.qty, 0);
  };

  // Inicializar contador
  useEffect(() => {
    const cnt = document.getElementById("contador");
    if (cnt) {
      const raw = localStorage.getItem("cart");
      let c = raw ? JSON.parse(raw) : [];
      cnt.textContent = c.reduce((s, i) => s + i.qty, 0);
    }
  }, []);

  // Filtrar productos según categoria
  const productosFiltrados =
    categoriaSeleccionada === null
      ? productos
      : productos.filter((p) => {
          if (p.category) return p.category === categoriaSeleccionada.name;
          if (p.categoriaId) return p.categoriaId === categoriaSeleccionada.id;
          return false;
        });

  return (
    <div className="is-preload homepage">
      <div className="img-fondos">
        <div className="wrapper">
          <h1 className="titulo">Productos</h1>
          <h2 className="subtitulo">Los mejores juegos del mercado</h2>
          <div className="mb-4 d-flex justify-content-center flex-wrap gap-2">
            <button
              className={`btn ${
                categoriaSeleccionada === null ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setCategoriaSeleccionada(null)}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                className={`btn ${
                  categoriaSeleccionada?.id === cat.id
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Productos */}
          <div className="container">
            {productosFiltrados.length === 0 ? (
              <p className="text-center mt-3">No hay productos disponibles.</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
                {productosFiltrados.map((product) => (
                  <div className="col mx-auto" key={product.id}>
                    <div className="card h-100 d-flex flex-column">
                      <Link to={`/detalle-producto/${product.id}`}>
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt={product.title}
                          style={{ height: 200, objectFit: "cover" }}
                        />
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="mt-auto mb-2">
                          <strong>
                            ${product.price.toLocaleString("es-CL")}
                          </strong>
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm mt-2"
                          onClick={() => agregar(product.id)}
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

