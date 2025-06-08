// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ranking = [
  { user_nickname: "Legend", score: 999999 },
  { user_nickname: "ProShooter", score: 854320 },
  { user_nickname: "FastHand", score: 782150 },
  { user_nickname: "Player1", score: 670000 },
  { user_nickname: "Player2", score: 620000 },
];

app.get("/ranking", (req, res) => {
  res.json({ ranking });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
