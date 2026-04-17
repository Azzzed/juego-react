import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pokémon game state
  const [pokemon, setPokemon] = useState(null);
  const [pokemonColor, setPokemonColor] = useState("");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null); // "correct" | "wrong" | null
  const [gameLoading, setGameLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    api.get("/auth/user")
      .then((res) => { setUser(res.data); setLoading(false); })
      .catch(() => { setUser(null); setLoading(false); });
  }, []);

  const fetchPokemon = async () => {
    setGameLoading(true);
    setResult(null);
    setGuess("");
    setRevealed(false);
    try {
      const randomId = Math.floor(Math.random() * 493) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await res.json();
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      setPokemon(data);
      setPokemonColor(speciesData.color.name);
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
    }
    setGameLoading(false);
  };

  useEffect(() => {
    if (user) fetchPokemon();
  }, [user]);

  const handleGuess = () => {
    if (!guess.trim() || !pokemon) return;
    const isCorrect = guess.trim().toLowerCase() === pokemon.name.toLowerCase();
    setResult(isCorrect ? "correct" : "wrong");
    setRevealed(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGuess();
  };

  const getImage = () => {
    if (!pokemon) return "";
    return pokemon.sprites?.other?.dream_world?.front_default
      || pokemon.sprites?.other?.["official-artwork"]?.front_default
      || pokemon.sprites?.front_default || "";
  };

  const typeColors = {
    normal:"#a8a878", fire:"#f08030", water:"#6890f0", electric:"#f8d030",
    grass:"#78c850", ice:"#98d8d8", fighting:"#c03028", poison:"#a040a0",
    ground:"#e0c068", flying:"#a890f0", psychic:"#f85888", bug:"#a8b820",
    rock:"#b8a038", ghost:"#705898", dragon:"#7038f8", dark:"#705848",
    steel:"#b8b8d0", fairy:"#ee99ac",
  };

  if (loading) {
    return (
      <>
        <style>{getStyles()}</style>
        <div className="dash-container">
          <div className="grid-bg"/>
          <div className="profile-card"><div className="spinner"/><p className="loading-text">Cargando sesión...</p></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <style>{getStyles()}</style>
        <div className="dash-container">
          <div className="grid-bg"/>
          <div className="profile-card">
            <p className="loading-text">No se encontró sesión activa.</p>
            <button className="new-game-btn" onClick={()=>window.location.href="/"}>Volver al inicio</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{getStyles()}</style>
      <div className="dash-container">
        <div className="grid-bg"/>
        <div className="particles">
          {[...Array(10)].map((_,i)=>(
            <div key={i} className="particle" style={{
              left: Math.random()*100+"%",
              animationDuration: 8+Math.random()*12+"s",
              animationDelay: Math.random()*5+"s",
              width: 2+Math.random()*3+"px", height: 2+Math.random()*3+"px",
              background:["rgba(239,68,68,0.25)","rgba(250,204,21,0.25)","rgba(66,133,244,0.25)"][i%3],
            }}/>
          ))}
        </div>

        <div className="main-layout">
          {/* Header con perfil */}
          <div className="header-bar">
            <div className="user-mini">
              <img src={user.photos?.[0]?.value} alt="" className="mini-avatar"/>
              <div>
                <span className="mini-name">{user.displayName}</span>
                <span className="mini-email">{user.emails?.[0]?.value}</span>
              </div>
            </div>
            <button className="logout-btn" onClick={()=>window.location.href="/"}>Cerrar sesión</button>
          </div>

          {/* Juego */}
          <div className="game-card">
            <h1 className="game-title">¿Quién es ese <span className="accent">Pokémon</span>?</h1>
            <p className="game-subtitle">Adivina el Pokémon usando las pistas</p>

            {gameLoading ? (
              <div style={{padding:"40px 0", textAlign:"center"}}>
                <div className="spinner"/>
                <p className="loading-text" style={{marginTop:12}}>Buscando Pokémon...</p>
              </div>
            ) : pokemon && (
              <>
                {/* Imagen */}
                <div className="pokemon-image-wrapper">
                  <div className={"pokemon-image-container" + (revealed ? " revealed" : "")}>
                    <img src={getImage()} alt="Pokémon" className="pokemon-img"/>
                  </div>
                </div>

                {/* Pistas */}
                <div className="clues-grid">
                  <div className="clue-item">
                    <span className="clue-label">ID</span>
                    <span className="clue-value">#{String(pokemon.id).padStart(3,"0")}</span>
                  </div>
                  <div className="clue-item">
                    <span className="clue-label">Tipo(s)</span>
                    <div className="types-row">
                      {pokemon.types.map((t) => (
                        <span key={t.type.name} className="type-badge"
                          style={{background: typeColors[t.type.name] || "#888"}}>
                          {t.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="clue-item">
                    <span className="clue-label">Color</span>
                    <span className="clue-value" style={{textTransform:"capitalize"}}>{pokemonColor}</span>
                  </div>
                  <div className="clue-item">
                    <span className="clue-label">Altura</span>
                    <span className="clue-value">{(pokemon.height/10).toFixed(1)} m</span>
                  </div>
                  <div className="clue-item">
                    <span className="clue-label">Peso</span>
                    <span className="clue-value">{(pokemon.weight/10).toFixed(1)} kg</span>
                  </div>
                  <div className="clue-item full-width">
                    <span className="clue-label">Ataques</span>
                    <div className="moves-row">
                      {pokemon.moves.slice(0,4).map((m) => (
                        <span key={m.move.name} className="move-badge">{m.move.name.replace("-"," ")}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Input y resultado */}
                {!revealed ? (
                  <div className="input-area">
                    <input
                      type="text"
                      className="guess-input"
                      placeholder="Escribe el nombre del Pokémon..."
                      value={guess}
                      onChange={(e)=>setGuess(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                    <button className="guess-btn" onClick={handleGuess} disabled={!guess.trim()}>
                      Adivinar
                    </button>
                  </div>
                ) : (
                  <div className={"result-box " + result}>
                    <div className="result-icon">{result==="correct" ? "🎉" : "😔"}</div>
                    <p className="result-text">
                      {result==="correct"
                        ? <>¡Correcto! Es <strong style={{textTransform:"capitalize"}}>{pokemon.name}</strong></>
                        : <>Incorrecto, el Pokémon era <strong style={{textTransform:"capitalize"}}>{pokemon.name}</strong></>}
                    </p>
                    <button className="new-game-btn" onClick={fetchPokemon}>
                      Nuevo Pokémon
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function getStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sora:wght@300;400;600;700&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }

    .dash-container {
      display:flex; justify-content:center; align-items:flex-start;
      min-height:100vh; width:100%; background:#0a0a1a;
      position:relative; overflow-x:hidden; font-family:'Outfit',sans-serif;
      padding: 20px;
    }
    .dash-container::before {
      content:''; position:absolute; width:600px; height:600px;
      background:radial-gradient(circle,rgba(239,68,68,0.08) 0%,transparent 70%);
      top:-200px; left:-100px; border-radius:50%; animation:float1 8s ease-in-out infinite;
    }
    .dash-container::after {
      content:''; position:absolute; width:500px; height:500px;
      background:radial-gradient(circle,rgba(250,204,21,0.06) 0%,transparent 70%);
      bottom:-150px; right:-100px; border-radius:50%; animation:float2 10s ease-in-out infinite;
    }
    @keyframes float1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,40px) scale(1.1)}}
    @keyframes float2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,-30px) scale(1.05)}}

    .grid-bg {
      position:absolute; inset:0;
      background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);
      background-size:60px 60px;
    }
    .particles{position:absolute;inset:0;z-index:1}
    .particle{position:absolute;border-radius:50%;animation:drift linear infinite}
    @keyframes drift{0%{transform:translateY(100vh);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-10vh);opacity:0}}

    .main-layout {
      position:relative; z-index:10; width:100%; max-width:640px;
      animation:cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) forwards;
      opacity:0; transform:translateY(30px);
    }
    @keyframes cardEntry{to{opacity:1;transform:translateY(0)}}

    /* Header */
    .header-bar {
      display:flex; justify-content:space-between; align-items:center;
      padding:16px 24px; border-radius:16px; margin-bottom:20px;
      background:rgba(255,255,255,0.04); backdrop-filter:blur(16px);
      border:1px solid rgba(255,255,255,0.07);
    }
    .user-mini { display:flex; align-items:center; gap:12px; }
    .mini-avatar { width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid rgba(255,255,255,0.15); }
    .mini-name { display:block; color:#fff; font-weight:600; font-size:14px; }
    .mini-email { display:block; color:rgba(255,255,255,0.35); font-size:12px; }
    .logout-btn {
      padding:8px 18px; border:1px solid rgba(255,255,255,0.1); border-radius:10px;
      background:transparent; color:rgba(255,255,255,0.5); font-family:'Outfit',sans-serif;
      font-size:13px; cursor:pointer; transition:all 0.3s ease;
    }
    .logout-btn:hover { background:rgba(239,68,68,0.1); border-color:rgba(239,68,68,0.3); color:#ef4444; }

    /* Game card */
    .game-card {
      padding:36px 32px; border-radius:24px;
      background:rgba(255,255,255,0.04); backdrop-filter:blur(20px);
      border:1px solid rgba(255,255,255,0.08);
      box-shadow:0 24px 48px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05);
    }
    .game-title {
      font-family:'Sora',sans-serif; font-size:26px; font-weight:700;
      color:#fff; text-align:center; margin-bottom:4px; letter-spacing:-0.3px;
    }
    .accent { color:#facc15; }
    .game-subtitle { text-align:center; color:rgba(255,255,255,0.35); font-size:14px; margin-bottom:28px; font-weight:300; }

    /* Pokémon image */
    .pokemon-image-wrapper { display:flex; justify-content:center; margin-bottom:24px; }
    .pokemon-image-container {
      width:160px; height:160px; border-radius:50%;
      background:rgba(255,255,255,0.05); border:2px solid rgba(255,255,255,0.08);
      display:flex; align-items:center; justify-content:center;
      overflow:hidden; position:relative;
    }
    .pokemon-image-container::before {
      content:'?'; position:absolute; font-size:60px; color:rgba(255,255,255,0.08);
      font-weight:700; font-family:'Sora',sans-serif;
      transition:opacity 0.4s ease;
    }
    .pokemon-image-container.revealed::before { opacity:0; }
    .pokemon-img {
      width:120px; height:120px; object-fit:contain;
      filter:brightness(0) saturate(0);
      transition:filter 0.6s ease;
    }
    .pokemon-image-container.revealed .pokemon-img { filter:none; }

    /* Clues */
    .clues-grid {
      display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:24px;
    }
    .clue-item {
      padding:14px 16px; border-radius:12px;
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);
    }
    .clue-item.full-width { grid-column:1/-1; }
    .clue-label { display:block; font-size:11px; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; font-weight:500; }
    .clue-value { font-size:15px; color:#fff; font-weight:600; }

    .types-row { display:flex; gap:6px; flex-wrap:wrap; }
    .type-badge {
      padding:3px 10px; border-radius:6px; font-size:12px; font-weight:600;
      color:#fff; text-transform:capitalize; letter-spacing:0.3px;
    }
    .moves-row { display:flex; gap:6px; flex-wrap:wrap; }
    .move-badge {
      padding:4px 10px; border-radius:8px; font-size:12px;
      background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08);
      color:rgba(255,255,255,0.7); text-transform:capitalize;
    }

    /* Input */
    .input-area { display:flex; gap:10px; }
    .guess-input {
      flex:1; padding:14px 18px; border-radius:12px;
      background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
      color:#fff; font-family:'Outfit',sans-serif; font-size:15px;
      outline:none; transition:border-color 0.3s ease;
    }
    .guess-input::placeholder { color:rgba(255,255,255,0.25); }
    .guess-input:focus { border-color:rgba(250,204,21,0.4); }
    .guess-btn {
      padding:14px 28px; border:none; border-radius:12px;
      background:linear-gradient(135deg,#ef4444,#dc2626);
      color:#fff; font-family:'Outfit',sans-serif; font-size:15px; font-weight:600;
      cursor:pointer; transition:all 0.3s ease;
      box-shadow:0 4px 12px rgba(239,68,68,0.3);
    }
    .guess-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(239,68,68,0.4); }
    .guess-btn:disabled { opacity:0.4; cursor:not-allowed; transform:none; }

    /* Result */
    .result-box {
      text-align:center; padding:28px 20px; border-radius:16px;
      animation:fadeIn 0.5s ease forwards;
    }
    .result-box.correct { background:rgba(34,197,94,0.08); border:1px solid rgba(34,197,94,0.2); }
    .result-box.wrong { background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); }
    @keyframes fadeIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
    .result-icon { font-size:40px; margin-bottom:12px; }
    .result-text { color:#fff; font-size:18px; margin-bottom:20px; line-height:1.5; }
    .result-text strong { font-weight:700; }
    .result-box.correct .result-text strong { color:#22c55e; }
    .result-box.wrong .result-text strong { color:#ef4444; }

    .new-game-btn {
      padding:12px 28px; border:none; border-radius:12px;
      background:linear-gradient(135deg,#facc15,#eab308);
      color:#0a0a1a; font-family:'Outfit',sans-serif; font-size:15px; font-weight:600;
      cursor:pointer; transition:all 0.3s ease;
      box-shadow:0 4px 12px rgba(250,204,21,0.25);
    }
    .new-game-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(250,204,21,0.35); }

    /* Loading */
    .spinner {
      width:36px; height:36px; margin:0 auto;
      border:3px solid rgba(255,255,255,0.1); border-top-color:#facc15;
      border-radius:50%; animation:spin 0.8s linear infinite;
    }
    @keyframes spin{to{transform:rotate(360deg)}}
    .loading-text { color:rgba(255,255,255,0.4); font-size:14px; text-align:center; }

    .profile-card {
      position:relative; z-index:10; width:100%; max-width:400px; margin:auto;
      padding:44px 36px; border-radius:24px;
      background:rgba(255,255,255,0.04); backdrop-filter:blur(20px);
      border:1px solid rgba(255,255,255,0.08); text-align:center;
      display:flex; flex-direction:column; align-items:center; gap:16px;
      margin-top:30vh;
    }

    @media (max-width:500px) {
      .game-card { padding:24px 18px; }
      .clues-grid { grid-template-columns:1fr; }
      .input-area { flex-direction:column; }
      .header-bar { flex-direction:column; gap:12px; text-align:center; }
    }
  `;
}

export default Dashboard;