const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "servermysqlcn1.mysql.database.azure.com",
  user: "userdb",
  password: "admin@123",
  database: "alexandre",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL");
  }
});

module.exports = db;
