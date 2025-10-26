import React, { useEffect, useState } from "react";
import reportesData from "../utils/reportesData"; 

export default function Reportes() {
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
  
        const raw = localStorage.getItem("contactos");
        let contactosLS = raw ? JSON.parse(raw) : [];
        const todosContactos = [...reportesData, ...contactosLS];
        setContactos(todosContactos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
    }, []);

    return (
        <div className="container my-4">
            <h2>Reportes de Contacto</h2>
            {contactos.length === 0 && <div>No hay mensajes enviados.</div>}

            {contactos.map((c, i) => (
                <div key={i} className="card mb-3">
                    <div className="card-header">
                        {c.nombre} - {c.email}
                    </div>
                    <div className="card-body">
                        <p>{c.texto}</p>
                        <small>Enviado el: {new Date(c.fecha).toLocaleString()}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}
