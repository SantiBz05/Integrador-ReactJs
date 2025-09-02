import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext); // <- tomamos datos del contexto

  const navStyle = {
    backgroundColor: "#1a1a1a",
    padding: "10px 0",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    borderBottom: "3px solid #cc8740",
  };

  const linkStyle = {
    backgroundColor: "#000",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 10px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Inicio</Link>
      {user ? (
        <>
          <Link to="/productos" style={linkStyle}>Productos</Link>
          <Link to="/usuarios" style={linkStyle}>Usuarios</Link>
          {user.role === 'admin' && (
            <Link to="/usuarios-admin" style={linkStyle}>Panel Admin</Link>
          )}
          <button style={linkStyle} onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/inicio-sesion" style={linkStyle}>Iniciar sesión</Link>
          <Link to="/registro" style={linkStyle}>Registrarse</Link>
        </>
      )}
    </nav>
  );
}
