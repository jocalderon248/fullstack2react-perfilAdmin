import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import usuarios from "../utils/usuariosEjemplo.js";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    telefono: "",
    region: "",
    comuna: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem("app_users");
    if (raw) {
      try {
        setUsers(JSON.parse(raw));
      } catch {
        setUsers(usuarios);
        localStorage.setItem("app_users", JSON.stringify(usuarios));
      }
    } else {
      setUsers(usuarios);
      localStorage.setItem("app_users", JSON.stringify(usuarios));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("app_users", JSON.stringify(users));
  }, [users]);

  const formatCurrency = (n) => "$" + Number(n).toLocaleString("es-CL");

  const resetForm = () =>
    setForm({ nombre: "", email: "", contraseña: "", telefono: "", region: "", comuna: "" });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.contraseña) return;
    const newUser = { ...form, id: uid(), compras: [] };
    setUsers((s) => [newUser, ...s]);
    resetForm();
    setShowCreate(false);
  };

  const openEdit = (user) => {
    setSelected(user);
    setForm({
      nombre: user.nombre || "",
      email: user.email || "",
      contraseña: user.contraseña || "",
      telefono: user.telefono || "",
      region: user.region || "",
      comuna: user.comuna || "",
    });
    setShowEdit(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!selected) return;
    setUsers((s) =>
      s.map((u) =>
        u.id === selected.id ? { ...u, ...form } : u
      )
    );
    setShowEdit(false);
    setSelected(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Eliminar usuario?")) return;
    setUsers((s) => s.filter((u) => u.id !== id));
  };

  const openHistory = (user) => {
    setSelected(user);
    setShowHistory(true);
  };

  const addMockPurchase = (userId) => {
    const purchase = {
      id: uid(),
      titulo: "Compra demo",
      price: Math.floor(Math.random() * 40000) + 1000,
      fecha: new Date().toISOString().slice(0, 10),
    };
    setUsers((s) =>
      s.map((u) => (u.id === userId ? { ...u, compras: [purchase, ...(u.compras || [])] } : u))
    );
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Administrar Usuarios</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => setShowCreate(true)}>
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Región / Comuna</th>
              <th>Compras</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No hay usuarios</td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>{u.region} / {u.comuna}</td>
                <td>{(u.compras || []).length}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-info me-2" onClick={() => openHistory(u)}>Historial</button>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => openEdit(u)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Modal Crear Usuario*/}
      {showCreate && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <form className="modal-content" onSubmit={handleCreate}>
                <div className="modal-header">
                  <h5 className="modal-title">Crear Usuario</h5>
                  <button type="button" className="btn-close" onClick={() => setShowCreate(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" value={form.contraseña} onChange={(e) => setForm({ ...form, contraseña: e.target.value })} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="form-label">Región</label>
                      <input className="form-control" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
                    </div>
                    <div className="col">
                      <label className="form-label">Comuna</label>
                      <input className="form-control" value={form.comuna} onChange={(e) => setForm({ ...form, comuna: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cerrar</button>
                  <button type="submit" className="btn btn-primary">Crear</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

     {/*Modal Edicion*/}
{showEdit && selected && (
  <>
    <div className="modal-backdrop fade show" />
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <form className="modal-content" onSubmit={handleEdit}>
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="btn-close" onClick={() => { setShowEdit(false); setSelected(null); resetForm(); }} />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={form.contraseña} onChange={(e) => setForm({ ...form, contraseña: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Teléfono</label>
              <input type="text" className="form-control" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Región</label>
                <input className="form-control" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
              </div>
              <div className="col">
                <label className="form-label">Comuna</label>
                <input className="form-control" value={form.comuna} onChange={(e) => setForm({ ...form, comuna: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => { setShowEdit(false); setSelected(null); resetForm(); }}>Cerrar</button>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    </>
    )}

      {/*Modal Historial*/}
      {showHistory && selected && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Historial de compras — {selected.nombre}</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowHistory(false); setSelected(null); }} />
                </div>
                <div className="modal-body">
                  {(selected.compras || []).length === 0 ? (
                    <div className="alert alert-info">Sin compras registradas</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Título</th>
                            <th className="text-end">Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.compras.map((c) => (
                            <tr key={c.id}>
                              <td style={{ width: 120 }}>{c.fecha}</td>
                              <td>{c.titulo}</td>
                              <td className="text-end">{formatCurrency(c.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan="2">Total</th>
                            <th className="text-end">
                              {formatCurrency((selected.compras || []).reduce((s, i) => s + (i.price || 0), 0))}
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowHistory(false); setSelected(null); }}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
