import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PerfilAdmin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [passwords, setPasswords] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuarioActual || usuarioActual.rol !== 'admin') {
      navigate('/inicio-sesion');
      return;
    }
    setUsuario(usuarioActual);
  }, [navigate]);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActual');
    navigate('/inicio-sesion');
  };

  const handleCambiarContraseña = (e) => {
    e.preventDefault();
    setError('');

    if (passwords.actual !== usuario.contraseña) {
      setError('La contraseña actual es incorrecta');
      return;
    }

    if (passwords.nueva !== passwords.confirmar) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (passwords.nueva.length < 4 || passwords.nueva.length > 10) {
      setError('La contraseña debe tener entre 4 y 10 caracteres');
      return;
    }

    // Actualizar contraseña en localStorage para el usuario actual
    const usuarioActualizado = { ...usuario, contraseña: passwords.nueva };
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));

    // Actualizar contraseña en la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('app_users') || '[]');
    const nuevosUsuarios = usuarios.map(u => 
      u.id === usuario.id ? usuarioActualizado : u
    );
    localStorage.setItem('app_users', JSON.stringify(nuevosUsuarios));

    setUsuario(usuarioActualizado);
    setShowModal(false);
    setPasswords({ actual: '', nueva: '', confirmar: '' });
    alert('Contraseña actualizada exitosamente');
  };

  if (!usuario) {
    return <div className="container mt-4">Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Perfil de Administrador</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Nombre:</strong> {usuario.nombre}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {usuario.email}
              </div>
              <div className="mb-3">
                <strong>Teléfono:</strong> {usuario.telefono}
              </div>
              <div className="mb-3">
                <strong>Región:</strong> {usuario.region}
              </div>
              <div className="mb-3">
                <strong>Comuna:</strong> {usuario.comuna}
              </div>
              <div className="mb-3">
                <strong>Rol:</strong> {usuario.rol}
              </div>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowModal(true)}
                >
                  Cambiar Contraseña
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={handleCerrarSesion}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cambiar Contraseña */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleCambiarContraseña}>
                <div className="modal-header">
                  <h5 className="modal-title">Cambiar Contraseña</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => {
                      setShowModal(false);
                      setError('');
                      setPasswords({ actual: '', nueva: '', confirmar: '' });
                    }}
                  />
                </div>
                <div className="modal-body">
                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Contraseña Actual</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwords.actual}
                      onChange={(e) => setPasswords({
                        ...passwords,
                        actual: e.target.value
                      })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nueva Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwords.nueva}
                      onChange={(e) => setPasswords({
                        ...passwords,
                        nueva: e.target.value
                      })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmar Nueva Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwords.confirmar}
                      onChange={(e) => setPasswords({
                        ...passwords,
                        confirmar: e.target.value
                      })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setError('');
                      setPasswords({ actual: '', nueva: '', confirmar: '' });
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}