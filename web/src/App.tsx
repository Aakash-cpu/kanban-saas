import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Boards from "./pages/Boards";
import Board from "./pages/Board";
import { useEffect } from "react";
import { setAuthToken } from "./lib/api";
function Navbar() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => setAuthToken(token), [token]);
  return (
    <div className="nav container">
      <div><Link to="/">Kanban</Link></div>
      <div style={{display:'flex', gap:12}}>
        {!token ? (<>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>) : (
          <button className="btn" onClick={() => { localStorage.removeItem("token"); nav("/login"); }}>Logout</button>
        )}
      </div>
    </div>
  )
}
export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/boards/:id" element={<Board />} />
        </Routes>
      </div>
    </>
  )
}
