const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Importando as rotas
const customersRoutes = require("./routes/customers");
const vehiclesRoutes = require("./routes/vehicles");
const rentalsRoutes = require("./routes/rentals");

// Definindo as rotas
app.use("/clientes", customersRoutes);
app.use("/veiculos", vehiclesRoutes);
app.use("/locacoes", rentalsRoutes);

// Servidor rodando
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
