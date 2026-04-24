const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// 📂 archivo donde se guardan las keys
const FILE = path.join(__dirname, 'keys.json');

// cargar keys
let keys = [];
if (fs.existsSync(FILE)) {
  keys = JSON.parse(fs.readFileSync(FILE));
}

// guardar keys
function saveKeys() {
  fs.writeFileSync(FILE, JSON.stringify(keys, null, 2));
}

// 🔐 validar key (launcher)
app.post('/check', (req, res) => {
  const { key } = req.body;

  if (keys.includes(key)) {
    return res.json({ status: "valid" });
  }

  res.json({ status: "invalid" });
});

// ➕ crear key (panel)
app.post('/create', (req, res) => {
  const newKey = Math.random().toString(36).substring(2, 10).toUpperCase();

  keys.push(newKey);
  saveKeys();

  res.json({ key: newKey });
});

// 📋 ver keys
app.get('/keys', (req, res) => {
  res.json(keys);
});

// 🌐 panel web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'panel.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});