import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [cantProductos, setCantProductos] = useState(0);
  const [cantOrdenes, setCantOrdenes] = useState(0);
  const [cantUsuarios, setCantUsuarios] = useState(0);

  const cargarDatos = () => {
    try {
      const productos = JSON.parse(localStorage.getItem("app_products")) || [];
      const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
      const usuarios = JSON.parse(localStorage.getItem("app_users")) || [];

      setCantProductos(productos.length);
      setCantOrdenes(ordenes.length);
      setCantUsuarios(usuarios.length);
    } catch {
      setCantProductos(0);
      setCantOrdenes(0);
      setCantUsuarios(0);
    }
  };

  useEffect(() => {
    cargarDatos();
    const handleStorage = (e) => {
      if (["app_products", "ordenes", "app_users"].includes(e.key)) {
        cargarDatos();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const links = [
    { to: "/ordenes-admin", label: "Órdenes", emoji: "🧾" },
    { to: "/productos-admin", label: "Productos", emoji: "🎮" },
    { to: "/categorias-admin", label: "Categorías", emoji: "🏷️" },
    { to: "/usuarios", label: "Usuarios", emoji: "👥" },
    { to: "/reportes", label: "Reportes", emoji: "📊" },
    { to: "/perfil-admin", label: "Perfil", emoji: "👤" },
    { to: "/", label: "Volver a la Tienda", emoji: "🏪" },
  ];

  return (
    <div className="container my-5 text-center">
      <h1 className="mb-4">Panel de Administración</h1>
      <p className="text-muted mb-5">
        Resumen de las Actividades diarias.
      </p>

      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="text-primary">📦 Productos</h5>
              <h2>{cantProductos}</h2>
              <h7 className="text-primary">Disponibles</h7>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="text-success">🧾 Órdenes</h5>
              <h2>{cantOrdenes}</h2>
            <h7 className="text-success">Cantidad De Órdenes</h7>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="text-info">👥 Usuarios</h5>
              <h2>{cantUsuarios}</h2>
                <h7 className="text-info">Usando nuestra App</h7>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {links.map((link, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
            <Link
              to={link.to}
              className="card shadow-sm border-0 text-decoration-none h-100"
            >
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <span style={{ fontSize: "2rem" }}>{link.emoji}</span>
                <h5 className="mt-3 text-dark">{link.label}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


