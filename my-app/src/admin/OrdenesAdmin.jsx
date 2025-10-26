import React, { useEffect, useState } from "react";

export default function OrdenesAdmin() {
  const [ordenes, setOrdenes] = useState([]);

  const cargarOrdenes = () => {
    const raw = localStorage.getItem("ordenes");
    if (raw) {
      const parsed = JSON.parse(raw);
      setOrdenes(parsed.sort((a, b) => b.id - a.id)); 
    } else {
      setOrdenes([]);
    }
  };

  useEffect(() => {
    cargarOrdenes();

    const handleStorage = (e) => {
      if (e.key === "ordenes") cargarOrdenes();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="container my-4">
      <h2>Historial de Órdenes</h2>

      {ordenes.length === 0 && (
        <div className="alert alert-info">No hay órdenes registradas.</div>
      )}

      {ordenes.map((o) => (
        <div key={o.id} className="card mb-3">
          <div className="card-header">
            <strong>Orden #{o.id}</strong> - {new Date(o.fecha).toLocaleString()}
          </div>
          <div className="card-body">
            <h5>Cliente:</h5>
            <p>
              {o.cliente.nombre} {o.cliente.apellido} <br />
              {o.cliente.correo} <br />
              {o.cliente.calle} {o.cliente.departamento} <br />
              {o.cliente.comuna}, {o.cliente.region} <br />
              {o.cliente.indicaciones}
            </p>

            <h5>Productos:</h5>
            <ul>
              {o.productos.map((p) => (
                <li key={p.id}>
                  {p.title} - {p.qty} x {p.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
                </li>
              ))}
            </ul>

            <h5>
              Total: {o.total.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
}

