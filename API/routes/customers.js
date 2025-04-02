const express = require("express");
const db = require("../db"); // Arquivo para conexão centralizada
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { nome, contato } = req.body;
  db.query(
    "INSERT INTO clientes (nome, contato) VALUES (?, ?)",
    [nome, contato],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: results.insertId, nome, contato });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM clientes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }
    res.json({ message: "Cliente deletado com sucesso!" });
  });
});

module.exports = router;
