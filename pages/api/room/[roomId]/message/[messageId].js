import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;

  if (req.method === "DELETE") {
    const rooms = readDB();
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);

    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    const messageIdx = rooms[roomIdx].messages.findIndex(
      (x) => x.messageId === messageId
    );

    if (messageIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });

    rooms[roomIdx].messages.splice(messageIdx, 1);
    writeDB(rooms);
    return res.json({ ok: true });
  }
}
