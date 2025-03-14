const express = require("express");
const authorRouter = express.Router();
const { pgPool } = require("../database");

authorRouter.post("/", async (req, res) => {
  const { authorName } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING *",
      [authorName]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to create author", error: err.message });
  }
});

authorRouter.get("/", async (req, res) => {
  try {
    const result = await pgPool.query("SELECT * FROM authors");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve authors", error: err.message });
  }
});

authorRouter.put("/:id", async (req, res) => {
  const { authorName } = req.body;
  try {
    const result = await pgPool.query(
      "UPDATE authors SET name = $1 WHERE id = $2 RETURNING *",
      [authorName, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to update author", error: err.message });
  }
});

authorRouter.delete("/:id", async (req, res) => {
  try {
    const result = await pgPool.query("DELETE FROM authors WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete author", error: err.message });
  }
});

module.exports = authorRouter;
