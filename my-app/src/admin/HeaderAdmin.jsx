import { Link } from "react-router-dom";

const HeaderAdmin = () => (
  <header
    style={{
      backgroundColor: "#222",
      color: "white",
      padding: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <h2 style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
      Panel de Administración
    </h2>
    <nav>
      <Link to="/dashboard" style={{ color: "white",marginRight: "15px", textDecoration: "none" }}>
        Dashboard    
      </Link>
      <Link to="/usuarios" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
        Usuarios
      </Link>
      <Link to="/productos-admin" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
        Productos
      </Link>
      <Link to="/categorias-admin" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
        Categorías
      </Link>
      <Link to="/ordenes-admin" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
        Órdenes
      </Link>
      <Link to="/reportes" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
        Reportes
      </Link>
      <Link to="/perfil-admin" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
        Perfil
      </Link>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Volver al inicio
      </Link>
    </nav>
  </header>
);

export default HeaderAdmin;



