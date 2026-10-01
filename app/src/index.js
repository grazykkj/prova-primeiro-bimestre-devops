const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "reservas_db",
});

const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS reservas (
      id SERIAL PRIMARY KEY,
      cliente VARCHAR(100) NOT NULL,
      data VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Tabela reservas verificada/criada com sucesso.");
  } catch (err) {
    console.error("Erro ao inicializar o banco de dados:", err);
  }
};

initDb();

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.status(200).json({ status: "OK", database: "Connected" });
  } catch (err) {
    return res.status(500).json({ status: "ERROR", database: err.message });
  }
});

app.post("/reservas", async (req, res) => {
  const { cliente, data, status } = req.body;

  if (!cliente || !data || !status) {
    return res.status(400).json({ error: "Campos cliente, data e status sao obrigatorios." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO reservas (cliente, data, status) VALUES ($1, $2, $3) RETURNING *",
      [cliente, data, status]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/reservas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservas ORDER BY id ASC");
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/reservas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM reservas WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reserva nao encontrada." });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.put("/reservas/:id", async (req, res) => {
  const { id } = req.params;
  const { cliente, data, status } = req.body;

  try {
    const check = await pool.query("SELECT * FROM reservas WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Reserva nao encontrada." });
    }

    const result = await pool.query(
      "UPDATE reservas SET cliente = COALESCE($1, cliente), data = COALESCE($2, data), status = COALESCE($3, status) WHERE id = $4 RETURNING *",
      [cliente, data, status, id]
    );
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete("/reservas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM reservas WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reserva nao encontrada." });
    }
    return res.status(200).json({ message: "Reserva removida com sucesso.", reserva: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de Reservas rodando na porta ${PORT}`);
});
