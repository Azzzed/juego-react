import React from "react";

// Estilos generales (fondo oscuro elegante)
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // Fondo oscuro con degradado azul
  padding: "20px",
};

// Tarjeta de login (más ancha y llamativa)
const cardStyle = {
  width: "100%",
  maxWidth: "500px", // Aumentado el ancho
  padding: "50px 40px",
  borderRadius: "18px",
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semitransparente
  boxShadow: "0 10px 35px rgba(0, 0, 0, 0.4)",
  textAlign: "center",
  backdropFilter: "blur(12px)", // Efecto vidrio esmerilado
  color: "#fff",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

// Botón de Google
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "14px 25px",
  backgroundColor: "#4285F4",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.3s ease, transform 0.2s ease",
};

// Icono
const iconStyle = {
  marginRight: "10px",
  fontSize: "20px",
};

const Home = () => {
  const handleLogin = () => {
    // Redirige al backend
    window.location.href = "https://obscure-space-spork-r4wq446r7r7r39w4-3000.app.github.dev/auth/google";
  };

  return (
    <div style={containerStyle}>
      <div
        style={cardStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h1 style={{ marginBottom: "10px", color: "#fff" }}>Bienvenido 👋</h1>
        <p style={{ color: "#ddd", marginBottom: "35px" }}>
          Por favor, inicia sesión para acceder a tu panel.
        </p>
        <button
          onClick={handleLogin}
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ae8")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4285F4")}
        >
          <span style={iconStyle}>🌐</span>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Home;
