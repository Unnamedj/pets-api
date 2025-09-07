const express = require("express");
const app = express();
app.use(express.json());

let last = null;

app.get("/", (_, res) => res.send("API OK"));

app.post("/api", (req, res) => {
  last = req.body || {};
  console.log("Received:", last);
  res.json({ status: "success", received: last });
});

app.get("/data.json", (_, res) => {
  res.json(last || { status: "empty" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on", PORT));
