import React, { useEffect, useState } from "react";
import api from "../services/api";

// Contenedor principal con fondo oscuro y centrado
const containerStyle = {
  display: "flex",
  justifyContent: "center",   // Centrar horizontalmente
  alignItems: "center",       // Centrar verticalmente
  height: "100vh",            // Ocupa todo el alto visible
  width: "100vw",             // Ocupa todo el ancho visible
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // Fondo degradado oscuro
  fontFamily: "Arial, sans-serif",
};

// Tarjeta de perfil del usuario
const profileCardStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "35px 25px",
  borderRadius: "14px",
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semitransparente (efecto vidrio)
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  color: "#fff",
  backdropFilter: "blur(10px)", // Desenfoque de fondo
};

// Imagen de perfil
const imageStyle = {
  borderRadius: "50%",
  width: "110px",
  height: "110px",
  objectFit: "cover",
  margin: "20px 0",
  border: "3px solid #4285F4", // Azul de Google
};

// Texto secundario
const infoTextStyle = {
  color: "#ccc",
  fontSize: "14px",
  marginBottom: "25px",
};

// Componente principal
const Dashboard = () => {
  const [user, setUser] = useState(null); // Estado: datos del usuario.
  useEffect(() => {
    // Montaje: Obtener datos del usuario desde el backend.
    api.get("/auth/user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []); // [] -> solo se ejecuta al montar el componente.

  // Si el usuario no está autenticado o aún carga
  if (!user) {
    return (
      <div style={containerStyle}>
        <div style={profileCardStyle}>
          <h2 style={{ color: "#ddd" }}>Cargando datos de sesión...</h2>
        </div>
      </div>
    );
  }

  // Si hay sesión activa, renderiza la tarjeta del usuario
  return (
    <div style={containerStyle}>
      <div style={profileCardStyle}>
        <h1 style={{ marginBottom: "8px" }}>Hola, {user.displayName}</h1>
        <p style={infoTextStyle}>¡Autenticación exitosa con Google!</p>
        <img
          src={user.photos?.[0]?.value}
          alt="Foto de perfil"
          style={imageStyle}
        />
        <h3 style={{ margin: "10px 0 5px", color: "#fff" }}>
          {user.emails?.[0]?.value}
        </h3>
        <p style={{ color: "#bbb", fontSize: "13px" }}>
          ID de sesión: {user.id}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
