const express = require('express');
const app = express();

app.use(express.json());

// 🔑 LISTA DE KEYS (puedes cambiar luego)
let keys = [
  "ABC123",
  "HACK2026",
  "PRO999"
];

app.post('/check', (req, res) => {
  const { key } = req.body;

  if (keys.includes(key)) {
    return res.json({ status: "valid" });
  }

  res.json({ status: "invalid" });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});