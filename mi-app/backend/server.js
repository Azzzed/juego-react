// Dependencias
const express = require("express");                          // Framework principal para el servidor.
const cors = require("cors");                                // Middleware para manejar peticiones de dominios cruzados (CORS).
const session = require("express-session");                  // Middleware para manejar sesiones de usuario.
const passport = require("passport");                        // Middleware para autenticación.
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Estrategia específica para autenticar con Google.
require("dotenv").config();                                  // Carga variables de entorno desde el archivo .env

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "https://obscure-space-spork-r4wq446r7r7r39w4-5173.app.github.dev", // URL de tu frontend (React)
    credentials: true, // Permite el intercambio de cookies/credenciales.
  })
);

// Configuración de sesión
app.use(
  session({
    secret: "secretkey",            // Clave para firmar la cookie de sesión.
    resave: false,                  // Evita guardar la sesión si no ha cambiado.
    saveUninitialized: true,        // Guarda sesiones nuevas/no inicializadas.
    cookie: {
      secure: false,                // En localhost debe ser false (no hay HTTPS).
      sameSite: "lax",              // Permite cookies en solicitudes del mismo sitio (para localhost).
    },
  })
);

// Inicializar Passport
app.use(passport.initialize());     // Inicializa el módulo Passport.
app.use(passport.session());        // Habilita el soporte de sesiones para Passport.

// Serialización de usuario (Sesiones)
passport.serializeUser((user, done) => done(null, user));    // Guarda el ID del usuario en la sesión.
passport.deserializeUser((user, done) => done(null, user));  // Recupera el objeto de usuario a partir del ID en la sesión.

// Estrategia de Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,                // ID de cliente de Google (del .env).
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,        // Secreto de cliente de Google (del .env).
      callbackURL: "https://obscure-space-spork-r4wq446r7r7r39w4-3000.app.github.dev/auth/google/callback", // URL a donde Google devuelve la respuesta.
    },
    (accessToken, refreshToken, profile, done) => {
      // Función ejecutada tras el login exitoso de Google.
      return done(null, profile);
    }
  )
);

// Rutas
// Ruta de prueba
app.get("/", (req, res) => res.send("Servidor funcionando correctamente"));

// Iniciar autenticación
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }) // Redirige a Google para el login.
);

// Callback de Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }), // Verifica la respuesta de Google; si falla, va a la raíz.
  (req, res) => {
    // Redirige al dashboard local después del login exitoso.
    res.redirect("https://obscure-space-spork-r4wq446r7r7r39w4-5173.app.github.dev/dashboard");
  }
);

// Obtener usuario autenticado
app.get("/auth/user", (req, res) => {
  // Envía el objeto de usuario si existe una sesión (req.user), sino envía null.
  res.send(req.user || null);
});

// Inicio del Servidor
// Puerto
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor backend corriendo en https://obscure-space-spork-r4wq446r7r7r39w4-3000.app.github.dev:${PORT}`)); // Inicia el servidor.
