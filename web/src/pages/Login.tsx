import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      nav("/");
    } catch (e) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="card" style={{maxWidth:420, margin:"40px auto"}}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{display:"grid", gap:10}}>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="btn" disabled={loading}>{loading?"...":"Login"}</button>
      </form>
    </div>
  )
}
