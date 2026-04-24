const express = require('express');
const app = express();

app.use(express.json());

// 🔑 KEY VÁLIDA
let keys = ["1234"];

app.post('/check', (req, res) => {
  const { key } = req.body;

  if (keys.includes(key)) {
    return res.json({ status: "valid" });
  }

  res.json({ status: "invalid" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
