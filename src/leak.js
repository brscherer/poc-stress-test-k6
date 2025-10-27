const express = require("express");

const app = express();
const cache = [];

app.get("/data", (req, res) => {
  const payload = Buffer.alloc(1024 * 50, "x"); // 50KB
  cache.push(payload); // never released
  res.json({ ok: true, cacheSize: cache.length });
});

app.listen(4000, () => console.log("Memory leak demo on port 4000"));
