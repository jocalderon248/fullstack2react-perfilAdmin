import React, { useState } from 'react';
import { validarContacto } from './utils/validaciones';
import "./styles/CssContactHtml.css";  

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [texto, setTexto] = useState('');
    const [nombreError, setNombreError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [textoError, setTextoError] = useState('');
    const [enviado, setEnviado] = useState('');

    const handleSubmit = (event) => {
        const valid = validarContacto(
            event,
            nombre,
            email,
            texto,
            setNombreError,
            setEmailError,
            setTextoError,
            setEnviado
        );

        if (valid) {
            const nuevoContacto = {
                nombre,
                email,
                texto,
                fecha: new Date().toISOString()
            };

            const contactosGuardados = JSON.parse(localStorage.getItem("contactos") || "[]");
            contactosGuardados.push(nuevoContacto);
            localStorage.setItem("contactos", JSON.stringify(contactosGuardados));

            setNombre('');
            setEmail('');
            setTexto('');
            setEnviado('Mensaje enviado correctamente.');
        }
    };

    return (
        <div className="img-fondo">
            <div className="contact-box">
                <div>
                    <img src="public/images/Logo_de_GameCloud.png" alt="Logo de GameCloud" />
                </div>
                <h2>Formulario de Contacto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        {nombreError && <div className="fore-text">{nombreError}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="fore-text">{emailError}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="texto">Comentario</label>
                        <textarea
                            className="form-control"
                            id="texto"
                            rows="3"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        />
                        {textoError && <div className="fore-text">{textoError}</div>}
                    </div>

                    <button type="submit">Enviar Mensaje</button>
                </form>
                {enviado && <div className="fore-text">{enviado}</div>}
            </div>
        </div>
    );
};

export default Contacto;
