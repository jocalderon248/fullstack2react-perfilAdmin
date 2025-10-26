import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validarCorreoYContraseña } from './utils/validaciones';
import usuariosBase from './utils/usuariosEjemplo'; 
import "./styles/CssInicioSesion.css";
import "./styles/main.css";

export default function InicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const valid = validarCorreoYContraseña(
      event,
      email,
      password,
      setEmailError,
      setPasswordError
    );

    if (!valid) return;

    const usuariosRegistrados = JSON.parse(localStorage.getItem("app_users")) || [];
    const todosLosUsuarios = [...usuariosBase, ...usuariosRegistrados];

    const user = todosLosUsuarios.find((u) => u.email === email);

    if (!user) {
      setEmailError("Correo no encontrado en la base de usuarios");
      return;
    }

    if (user.contraseña !== password) {
      setPasswordError("Contraseña incorrecta");
      return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify(user));

  
    if (user.nombre === "Juan Perez") {
      navigate("/dashboard"); 
    } else {
      navigate("/"); 
    }
  };

  return (
    <div className="img-fondo">
      <div className="login-box">
        <div>
          <img src="/images/Logo_de_GameCloud.png" alt="Logo de GameCloud" />
        </div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="fore-text">{passwordError}</div>}
          </div>

          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Acepto los términos y condiciones
            </label>
          </div>

          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>

          <div>
            <a
              onClick={() => navigate('/Registro')}
              style={{ cursor: 'pointer', textAlign: 'center', display: 'block', marginTop: '10px' }}
            >
              ¿No tienes cuenta? Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
