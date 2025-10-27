const express = require("express");

const app = express();
let counter = 0; // shared state - not thread-safe

app.post("/increment", (req, res) => {
  const current = counter; // read
  setTimeout(() => {
    counter = current + 1; // write (can be overwritten)
  }, Math.random() * 10);
  res.json({ ok: true });
});

app.get("/value", (req, res) => res.json({ counter }));

app.listen(3000, () => console.log("Race demo on port 3000"));
