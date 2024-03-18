const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const openDb = () => {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "todo",
        password: "2003",
        port: 5432
    });
    return pool;
};

app.get("/", (req, res) => {
    const pool = openDb();
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.post('/new', (req, res) => {
    const pool = openDb();

    pool.query(
        'INSERT INTO task (description) VALUES ($1) RETURNING *',
        [req.body.description],
        (error, result) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(200).json({ id: result.rows[0].id });
            }
        });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});