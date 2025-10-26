import React, { useState, useEffect } from "react";
import categoriasBase from "../utils/categoriasData.js";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "" });

  // Cargar categorías al iniciar
  useEffect(() => {
    const cargarCategorias = () => {
      const raw = localStorage.getItem("app_categorias");
      if (raw) {
        try {
          setCategorias(JSON.parse(raw));
        } catch {
          setCategorias(categoriasBase);
          localStorage.setItem("app_categorias", JSON.stringify(categoriasBase));
        }
      } else {
        setCategorias(categoriasBase);
        localStorage.setItem("app_categorias", JSON.stringify(categoriasBase));
      }
    };

    cargarCategorias();

  window.addEventListener("storage", cargarCategorias);
    return () => window.removeEventListener("storage", cargarCategorias);
  }, []);

  useEffect(() => {
    localStorage.setItem("app_categorias", JSON.stringify(categorias));
  }, [categorias]);

  const resetForm = () => setForm({ name: "" });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.name) return;

    const nueva = { id: uid(), ...form };
    setCategorias((s) => [nueva, ...s]);
    resetForm();
    setShowCreate(false);

    localStorage.setItem("app_categorias_update", Date.now());
  };

  const openEdit = (categoria) => {
    setSelected(categoria);
    setForm({ name: categoria.name });
    setShowEdit(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!selected) return;

    setCategorias((s) =>
      s.map((c) => (c.id === selected.id ? { ...c, ...form } : c))
    );
    setShowEdit(false);
    setSelected(null);
    resetForm();

    localStorage.setItem("app_categorias_update", Date.now());
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar categoría?")) return;
    setCategorias((s) => s.filter((c) => c.id !== id));

    localStorage.setItem("app_categorias_update", Date.now());
  };

  return (
    <div className="container my-4">
      <h2>Administrar Categorías</h2>
      <button className="btn btn-primary my-2" onClick={() => setShowCreate(true)}>Nueva Categoría</button>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center">No hay categorías</td>
            </tr>
          )}
          {categorias.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-warning me-2" onClick={() => openEdit(c)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreate && (
        <ModalCategoria
          title="Nueva Categoría"
          form={form}
          setForm={setForm}
          onClose={() => { setShowCreate(false); resetForm(); }}
          onSubmit={handleCreate}
        />
      )}

      {showEdit && selected && (
        <ModalCategoria
          title="Editar Categoría"
          form={form}
          setForm={setForm}
          onClose={() => { setShowEdit(false); setSelected(null); resetForm(); }}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
}

function ModalCategoria({ title, form, setForm, onClose, onSubmit }) {
  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                value={form.name}
                onChange={(e) => setForm({ name: e.target.value })}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
              <button type="submit" className="btn btn-primary">{title.includes("Editar") ? "Guardar" : "Crear"}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
