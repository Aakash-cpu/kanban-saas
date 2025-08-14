import { useEffect, useState } from "react";
import { api, setAuthToken } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
type Board = { _id: string; title: string };
export default function Boards() {
  const [boards, setBoards] = useState<Board[] | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return nav("/login");
    setAuthToken(token);
    api.get("/boards").then(r => setBoards(r.data)).catch(()=>nav("/login"));
  }, []);
  async function createBoard() {
    const title = prompt("Board title?");
    if (!title) return;
    const { data } = await api.post("/boards", { title });
    setBoards([data, ...(boards||[])]);
  }
  if (!boards) return <div className="skel" style={{height:100}} />;
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
        <h2>Your Boards</h2>
        <button className="btn" onClick={createBoard}>+ New Board</button>
      </div>
      <div className="grid">
        {boards.map(b => (
          <Link key={b._id} to={`/boards/${b._id}`} className="card">{b.title}</Link>
        ))}
      </div>
    </div>
  )
}
