const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let todos = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Do laundry", completed: true },
];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === +req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: "Title must be at least 3 characters" });
  }
  const newTodo = { id: todos.length + 1, title: title.trim(), completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === +req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  const { title, completed } = req.body;
  if (title) todo.title = title.trim();
  if (typeof completed === "boolean") todo.completed = completed;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const idx = todos.findIndex((t) => t.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  const removed = todos.splice(idx, 1);
  res.json(removed[0]);
});

app.get("/", (req, res) => res.send("Express API running ⚡"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
