import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa componentes de enrutamiento
import Home from "./pages/Home";           // Importa la página de inicio (login)
import Dashboard from "./pages/Dashboard"; // Importa la página del panel de control

function App() {
  return (
    <Router> {/* Contenedor principal que habilita la navegación */}
      <Routes> {/* Define el conjunto de rutas posibles */}
        <Route
          path="/"              // Ruta base
          element={<Home />}    // Renderiza Home para la ruta /
        />
        <Route
          path="/dashboard"     // Ruta protegida/de contenido
          element={<Dashboard />} // Renderiza Dashboard para la ruta /dashboard
        />
      </Routes>
    </Router>
  );
}

export default App;