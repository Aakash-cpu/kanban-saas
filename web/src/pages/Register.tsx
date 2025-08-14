import { useState } from "react";
import { api } from "../lib/api";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  async function submit(e:any) {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      setOk(true);
    } catch {
      alert("Registration failed");
    }
  }
  return (
    <div className="card" style={{maxWidth:460, margin:"40px auto"}}>
      <h2>Create account</h2>
      {ok ? <div>🎉 Registered. You can login now.</div> : (
        <form onSubmit={submit} style={{display:"grid", gap:10}}>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password (min 6)" />
          <button className="btn">Register</button>
        </form>
      )}
    </div>
  )
}
