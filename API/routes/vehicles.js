const express = require("express");
const db = require("../db");
const router = express.Router();
router.get("/", (req, res) => {
  db.query("SELECT * FROM veiculos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { brand, model, year, plate, availability } = req.body;
  db.query(
    "INSERT INTO veiculos (marca, modelo, ano, placa, disponibilidade) VALUES (?, ?, ?, ?, ?)",
    [brand, model, year, plate, availability || true],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Veículo cadastrado com sucesso!" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM veiculos WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    res.json({ message: "Veículo removido com sucesso!" });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { brand, model, year, plate, availability } = req.body;

  db.query(
    "UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, placa = ?, disponibilidade = ? WHERE id = ?",
    [brand, model, year, plate, availability, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }

      res.json({ message: "Veículo atualizado com sucesso!" });
    }
  );
});

router.patch("/:id/disponibilidade", (req, res) => {
  const { id } = req.params;
  const { availability } = req.body; // Expecting { availability: true/false }

  if (availability === undefined) {
    return res.status(400).json({ error: "Disponibilidade é obrigatória." });
  }

  db.query(
    "UPDATE veiculos SET disponibilidade = ? WHERE id = ?",
    [availability, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }

      res.json({ message: "Disponibilidade do veículo atualizada!" });
    }
  );
});

module.exports = router;
