import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CssRegistro.css";
import "./styles/main.css";

export default function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  const [nombreError, setNombreError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contraseñaError, setContraseñaError] = useState("");
  const [confirmarContraseñaError, setConfirmarContraseñaError] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setNombreError(""); setEmailError(""); setContraseñaError(""); setConfirmarContraseñaError(""); setRegistroExitoso("");

    if (!nombre) { setNombreError("Nombre requerido"); return; }
    if (!email) { setEmailError("Correo requerido"); return; }
    if (!contraseña) { setContraseñaError("Contraseña requerida"); return; }
    if (contraseña !== confirmarContraseña) { setConfirmarContraseñaError("Las contraseñas no coinciden"); return; }

    const usuariosGuardados = JSON.parse(localStorage.getItem("app_users")) || [];

    if (usuariosGuardados.find(u => u.email === email)) {
      setEmailError("El correo ya está registrado");
      return;
    }

    const nuevoUsuario = {
      id: Date.now().toString(36),
      nombre,
      email,
      contraseña,
      telefono,
      region,
      comuna,
      compras: [],
    };

    localStorage.setItem("app_users", JSON.stringify([nuevoUsuario, ...usuariosGuardados]));

    setRegistroExitoso("Usuario registrado correctamente. Redirigiendo...");
    setTimeout(() => navigate("/inicio-sesion"), 1000);

    setNombre(""); setEmail(""); setContraseña(""); setConfirmarContraseña(""); setTelefono(""); setRegion(""); setComuna("");
  };

  return (
    <main className="img-fondo">
      <div className="login-box">
        <div>
          <img src="/images/Logo_de_GameCloud.png" alt="Logo de GameCloud" />
        </div>
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
            {nombreError && <div className="fore-text">{nombreError}</div>}
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            {emailError && <div className="fore-text">{emailError}</div>}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" className="form-control" value={contraseña} onChange={e => setContraseña(e.target.value)} />
            {contraseñaError && <div className="fore-text">{contraseñaError}</div>}
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input type="password" className="form-control" value={confirmarContraseña} onChange={e => setConfirmarContraseña(e.target.value)} />
            {confirmarContraseñaError && <div className="fore-text">{confirmarContraseñaError}</div>}
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input type="text" className="form-control" value={telefono} onChange={e => setTelefono(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Región</label>
            <input type="text" className="form-control" value={region} onChange={e => setRegion(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Comuna</label>
            <input type="text" className="form-control" value={comuna} onChange={e => setComuna(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Registrarse</button>
          {registroExitoso && <div className="success-text">{registroExitoso}</div>}
        </form>
      </div>
    </main>
  );
}

