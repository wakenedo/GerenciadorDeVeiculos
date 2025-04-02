const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM locacoes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { veiculo_id, cliente_id, data_inicio, data_fim, valor } = req.body;

  db.query(
    "INSERT INTO locacoes (veiculo_id, cliente_id, data_inicio, data_fim, valor) VALUES (?, ?, ?, ?, ?)",
    [veiculo_id, cliente_id, data_inicio, data_fim, valor],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        message: "Locação registrada com sucesso!",
        id: results.insertId,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM locacoes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Locação não encontrada" });
    }
    res.json({ message: "Locação removida com sucesso!" });
  });
});

module.exports = router;
