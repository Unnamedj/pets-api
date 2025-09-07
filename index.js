const express = require("express");
const app = express();
app.use(express.json());

// Memoria simple (se borra si el servidor reinicia)
let last = null, history = [];

// Salud
app.get("/", (_, res) => res.send("API OK"));

// Recibir datos desde Roblox
app.post("/api", (req, res) => {
  last = req.body || {};
  history.push({ at: new Date().toISOString(), data: last });
  if (history.length > 200) history.shift(); // limita historial
  console.log("Received:", last);
  res.json({ status: "success", received: last });
});

// Ver último paquete
app.get("/data.json", (_, res) => {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(last || { status: "empty" }, null, 2));
});

// Ver historial (opcional)
app.get("/history.json", (_, res) => {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(history, null, 2));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on", PORT));
