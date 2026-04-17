import React, { useState } from "react";

const Home = () => {
  const [cardHover, setCardHover] = useState(false);

  const handleLogin = () => {
    window.location.href = "https://obscure-space-spork-r4wq446r7r7r39w4-3000.app.github.dev/auth/google";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sora:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .login-container {
          display: flex; justify-content: center; align-items: center;
          min-height: 100vh; width: 100%; background: #0a0a1a;
          position: relative; overflow: hidden; font-family: 'Outfit', sans-serif;
        }
        .login-container::before {
          content: ''; position: absolute; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%);
          top: -200px; right: -100px; border-radius: 50%;
          animation: float1 8s ease-in-out infinite;
        }
        .login-container::after {
          content: ''; position: absolute; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%);
          bottom: -150px; left: -100px; border-radius: 50%;
          animation: float2 10s ease-in-out infinite;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.1)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-30px) scale(1.05)} }

        .grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .login-card {
          position: relative; z-index: 10; width: 100%; max-width: 460px;
          padding: 48px 40px; border-radius: 24px;
          background: rgba(255,255,255,0.04); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease, border-color 0.4s ease;
          animation: cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) forwards;
          opacity: 0; transform: translateY(30px);
        }
        .login-card.hovered {
          transform: translateY(-4px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 80px rgba(239,68,68,0.05);
          border-color: rgba(239,68,68,0.15);
        }
        @keyframes cardEntry { to { opacity:1; transform:translateY(0) } }

        .pokeball-icon {
          width: 64px; height: 64px; margin: 0 auto 24px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 32px;
          box-shadow: 0 8px 24px rgba(239,68,68,0.3), inset 0 -2px 0 rgba(0,0,0,0.2);
          animation: logoEntry 0.6s 0.3s cubic-bezier(0.23,1,0.32,1) forwards;
          opacity: 0; transform: scale(0.8);
          position: relative; overflow: hidden;
        }
        .pokeball-icon::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: rgba(255,255,255,0.9); border-top: 3px solid #333;
        }
        .pokeball-icon .dot {
          width: 16px; height: 16px; background: #fff; border: 3px solid #333;
          border-radius: 50%; position: relative; z-index: 2;
        }
        @keyframes logoEntry { to { opacity:1; transform:scale(1) } }

        .login-title {
          font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 700;
          color: #fff; margin-bottom: 6px; text-align: center; letter-spacing: -0.5px;
          animation: textEntry 0.6s 0.4s cubic-bezier(0.23,1,0.32,1) forwards;
          opacity: 0; transform: translateY(10px);
        }
        .login-accent { color: #facc15; }
        @keyframes textEntry { to { opacity:1; transform:translateY(0) } }

        .login-subtitle {
          font-size: 15px; color: rgba(255,255,255,0.4); text-align: center;
          margin-bottom: 36px; line-height: 1.6; font-weight: 300;
          animation: textEntry 0.6s 0.5s cubic-bezier(0.23,1,0.32,1) forwards;
          opacity: 0; transform: translateY(10px);
        }

        .divider {
          display: flex; align-items: center; margin: 0 0 24px; gap: 12px;
          animation: textEntry 0.6s 0.55s cubic-bezier(0.23,1,0.32,1) forwards; opacity: 0;
        }
        .divider::before, .divider::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.08) }
        .divider span { font-size:12px; color:rgba(255,255,255,0.25); text-transform:uppercase; letter-spacing:1.5px; font-weight:500 }

        .google-btn {
          width: 100%; padding: 16px 24px; border: none; border-radius: 14px;
          font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;
          color: #fff; background: linear-gradient(135deg, #4285F4, #3367d6);
          box-shadow: 0 4px 16px rgba(66,133,244,0.3);
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1); letter-spacing: 0.2px;
          animation: textEntry 0.6s 0.6s cubic-bezier(0.23,1,0.32,1) forwards;
          opacity: 0; transform: translateY(10px);
        }
        .google-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(66,133,244,0.45);
          background: linear-gradient(135deg, #5a9bff, #4285F4);
        }
        .google-btn:active { transform: translateY(0) }
        .google-btn svg { width: 20px; height: 20px; }

        .footer-text {
          text-align: center; margin-top: 28px; font-size: 12px;
          color: rgba(255,255,255,0.18); line-height: 1.6;
          animation: textEntry 0.6s 0.7s cubic-bezier(0.23,1,0.32,1) forwards; opacity: 0;
        }

        .particles { position: absolute; inset: 0; z-index: 1; }
        .particle { position: absolute; border-radius: 50%; animation: drift linear infinite; }
        @keyframes drift {
          0% { transform: translateY(100vh) rotate(0deg); opacity:0 }
          10% { opacity:1 } 90% { opacity:1 }
          100% { transform: translateY(-10vh) rotate(720deg); opacity:0 }
        }
      `}</style>

      <div className="login-container">
        <div className="grid-bg" />
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: Math.random()*100+"%",
              animationDuration: 8+Math.random()*12+"s",
              animationDelay: Math.random()*5+"s",
              width: 2+Math.random()*3+"px", height: 2+Math.random()*3+"px",
              background: ["rgba(239,68,68,0.3)","rgba(250,204,21,0.3)","rgba(66,133,244,0.3)"][i%3],
            }} />
          ))}
        </div>

        <div className={"login-card"+(cardHover?" hovered":"")}
          onMouseEnter={()=>setCardHover(true)} onMouseLeave={()=>setCardHover(false)}>
          <div className="pokeball-icon"><div className="dot"/></div>
          <h1 className="login-title">¿Quién es ese <span className="login-accent">Pokémon</span>?</h1>
          <p className="login-subtitle">
            Inicia sesión para poner a prueba tu conocimiento<br/>y adivinar Pokémon por sus características.
          </p>
          <div className="divider"><span>continuar con</span></div>
          <button className="google-btn" onClick={handleLogin}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Iniciar sesión con Google
          </button>
          <p className="footer-text">Autenticación segura con Google OAuth 2.0</p>
        </div>
      </div>
    </>
  );
};

export default Home;