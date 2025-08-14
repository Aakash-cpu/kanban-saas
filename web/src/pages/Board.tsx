import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd";
import { io } from "socket.io-client";

type List = { _id: string; title: string; order: number };
type Card = { _id: string; listId: string; title: string; order: number };
type BoardResp = { board: { _id: string; title: string }; lists: List[]; cards: Card[] };

export default function Board() {
  const { id } = useParams();
  const [data, setData] = useState<BoardResp | null>(null);

  async function refresh() {
    const fresh = await api.get(`/boards/${id}`).then(r => r.data);
    setData(fresh);
  }

  useEffect(() => {
    refresh();
    const socket = io(import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:4000");
    socket.on("board:event", refresh);
    return () => {
      socket.disconnect();
    };
  }, [id]);

  async function onDragEnd(result: DropResult) {
    const { destination, draggableId } = result;
    if (!destination) return;
    const toListId = destination.droppableId;
    const toOrder = destination.index + 1;
    await api.patch("/cards/move", { cardId: draggableId, toListId, toOrder });
    await refresh();
  }

  async function addCard(listId: string) {
    const title = prompt("Card title?");
    if (!title || !title.trim()) return;
    await api.post("/cards", { listId, title: title.trim() });
    await refresh();
  }

  if (!data) return <div className="skel" style={{ height: 140 }} />;

  const grouped: Record<string, Card[]> = {};
  data.lists.forEach((l) => (grouped[l._id] = []));
  data.cards.forEach((c) => grouped[c.listId]?.push(c));

  return (
    <div>
      <h2>{data.board.title}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban">
          {data.lists.map((list) => (
            <Droppable droppableId={list._id} key={list._id}>
              {(provided) => (
                <div className="list" ref={provided.innerRef} {...provided.droppableProps}>
                  <h3>{list.title}</h3>

                  {(grouped[list._id] || []).map((card, idx) => (
                    <Draggable draggableId={card._id} index={idx} key={card._id}>
                      {(drag) => (
                        <div
                          className="kcard"
                          ref={drag.innerRef}
                          {...drag.draggableProps}
                          {...drag.dragHandleProps}
                        >
                          {card.title}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {/* Add new task button */}
                  <button className="btn" style={{ margin: 8 }} onClick={() => addCard(list._id)}>
                    + Add card
                  </button>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
