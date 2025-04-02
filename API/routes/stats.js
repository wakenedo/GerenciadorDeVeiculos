const express = require("express");
const router = express.Router();
const db = require("../db"); // Conexão com MySQL

// Obter estatísticas gerais
router.get("/", async (req, res) => {
  try {
    const [totalCustomers] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM clientes;");
    const [totalVehicles] = await db
      .promise()
      .query("SELECT COUNT(*) as count FROM veiculos;");
    const [availableVehicles] = await db
      .promise()
      .query(
        "SELECT COUNT(*) as count FROM veiculos WHERE disponibilidade = 1;"
      );
    const [activeRentals] = await db
      .promise()
      .query(
        "SELECT COUNT(*) as count FROM locacoes WHERE data_fim >= CURDATE();"
      );
    const [completedRentals] = await db
      .promise()
      .query(
        "SELECT COUNT(*) as count FROM locacoes WHERE data_fim < CURDATE();"
      );
    const [avgRentalDuration] = await db
      .promise()
      .query(
        "SELECT AVG(DATEDIFF(data_fim, data_inicio)) as avg_days FROM locacoes;"
      );
    const [mostRentedVehicle] = await db.promise().query(`
      SELECT veiculo_id, COUNT(*) as rental_count 
      FROM locacoes 
      GROUP BY veiculo_id 
      ORDER BY rental_count DESC 
      LIMIT 1;
    `);

    res.json({
      totalCustomers: totalCustomers[0].count,
      totalVehicles: totalVehicles[0].count,
      availableVehicles: availableVehicles[0].count,
      activeRentals: activeRentals[0].count,
      completedRentals: completedRentals[0].count,
      avgRentalDuration: avgRentalDuration[0].avg_days || 0,
      mostRentedVehicle: mostRentedVehicle[0] || null,
    });
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error);
    res.status(500).json({ error: "Erro ao obter estatísticas" });
  }
});

module.exports = router;
