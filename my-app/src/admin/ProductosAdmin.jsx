import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import productosBase from "../utils/productosData.js";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCritical, setShowCritical] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    qty: 0,
    category: "",
  });

  // Cargar productos
  useEffect(() => {
    const rawProducts = localStorage.getItem("app_products");
    if (rawProducts) {
      try {
        setProductos(JSON.parse(rawProducts));
      } catch {
        setProductos(productosBase);
        localStorage.setItem("app_products", JSON.stringify(productosBase));
      }
    } else {
      setProductos(productosBase);
      localStorage.setItem("app_products", JSON.stringify(productosBase));
    }

    const rawCats = localStorage.getItem("app_categorias");
    if (rawCats) {
      try {
        setCategorias(JSON.parse(rawCats));
      } catch {
        setCategorias([]);
      }
    } else {
      setCategorias([]);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("app_products", JSON.stringify(productos));
  }, [productos]);

  const resetForm = () =>
    setForm({ title: "", description: "", price: "", image: "", qty: 0, category: "" });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category) return;

    setProductos((s) => [
      {
        id: uid(),
        ...form,
        price: Number(form.price),
        qty: Number(form.qty),
      },
      ...s,
    ]);
    resetForm();
    setShowCreate(false);
  };

  const openEdit = (product) => {
    setSelected(product);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      qty: product.qty || 0,
      category: product.category || "",
    });
    setShowEdit(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!selected) return;

    setProductos((s) =>
      s.map((p) =>
        p.id === selected.id
          ? { ...p, ...form, price: Number(form.price), qty: Number(form.qty) }
          : p
      )
    );
    setShowEdit(false);
    setSelected(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    setProductos((s) => s.filter((p) => p.id !== id));
  };

  const handleReset = () => {
    if (!window.confirm("¿Restaurar lista original de productos?")) return;
    setProductos(productosBase);
    localStorage.setItem("app_products", JSON.stringify(productosBase));
  };

  const productosCriticos = productos.filter((p) => (p.qty || 0) <= 4);

  // Reporte
  const totalProductos = productos.length;
  const totalStock = productos.reduce((sum, p) => sum + (p.qty || 0), 0);
  const valorInventario = productos.reduce(
    (sum, p) => sum + p.price * (p.qty || 0),0
  );
  const topCaros = [...productos].sort((a, b) => b.price - a.price).slice(0, 5);
  const topBaratos = [...productos].sort((a, b) => a.price - b.price).slice(0, 5);

  const handleFileChange = async (file) => {
    if (file) {
      const base64 = await toBase64(file);
      setForm({ ...form, image: base64 });
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Administrar Productos</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => setShowCreate(true)}>Nuevo Producto</button>
          <button className="btn btn-danger me-2" onClick={() => setShowCritical(true)}>Productos Críticos</button>
          <button className="btn btn-info me-2" onClick={() => setShowReport(true)}>Ver Reporte</button>
          <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th className="text-end">Precio</th>
              <th className="text-end">Cantidad</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No hay productos</td>
              </tr>
            )}
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.image && <img src={p.image} alt={p.title} style={{ width: 60, height: 60, objectFit: "cover" }} />}</td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.category || "-"}</td>
                <td className="text-end">${p.price.toLocaleString("es-CL")}</td>
                <td className="text-end">{p.qty || 0}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => openEdit(p)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <ModalProducto
          title="Nuevo Producto"
          form={form}
          setForm={setForm}
          categorias={categorias}
          onClose={() => { setShowCreate(false); resetForm(); }}
          onSubmit={handleCreate}
          handleFileChange={handleFileChange}
        />
      )}

      {showEdit && selected && (
        <ModalProducto
          title="Editar Producto"
          form={form}
          setForm={setForm}
          categorias={categorias}
          onClose={() => { setShowEdit(false); setSelected(null); resetForm(); }}
          onSubmit={handleEdit}
          handleFileChange={handleFileChange}
        />
      )}

      {showCritical && (
        <ModalSimple title="Productos Críticos" onClose={() => setShowCritical(false)}>
          {productosCriticos.length === 0 ? <p>No hay productos críticos</p> : (
            <ul>{productosCriticos.map((p) => <li key={p.id}>{p.title} - Cantidad: {p.qty || 0}</li>)}</ul>
          )}
        </ModalSimple>
      )}

      {showReport && (
        <ModalSimple title="Reporte de Inventario" onClose={() => setShowReport(false)}>
          <p><strong>Total de productos:</strong> {totalProductos}</p>
          <p><strong>Stock total:</strong> {totalStock}</p>
          <p><strong>Valor total inventario:</strong> ${valorInventario.toLocaleString("es-CL")}</p>
          <h6>Top 5 productos más caros:</h6>
          <ul>{topCaros.map((p) => <li key={p.id}>{p.title} - ${p.price.toLocaleString("es-CL")}</li>)}</ul>
          <h6>Top 5 productos más baratos:</h6>
          <ul>{topBaratos.map((p) => <li key={p.id}>{p.title} - ${p.price.toLocaleString("es-CL")}</li>)}</ul>
        </ModalSimple>
      )}
    </div>
  );
}

// Modal Producto
function ModalProducto({ title, form, setForm, categorias, onClose, onSubmit, handleFileChange }) {
  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-scrollable">
          <form className="modal-content" onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Título</label>
                <input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="mb-2">
                <label className="form-label">Precio</label>
                <input type="number" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Cantidad</label>
                <input type="number" className="form-control" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                >
                  <option value="">Seleccione categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Imagen</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => handleFileChange(e.target.files[0])} />
                {form.image && <img src={form.image} alt="preview" style={{ width: 80, height: 80, marginTop: 5, objectFit: "cover" }} />}
              </div>
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

// Modal simple
function ModalSimple({ title, onClose, children }) {
  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



