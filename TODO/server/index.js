const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3001;

const openDb = () => {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "todo",
        password: "2003",
        port: 5432,
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
        'INSERT INTO task (description) VALUES ($1) returning *',
        [req.body.description],
        (error, result) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: error.message });
            } else {
                console.log('result ', result )
                res.status(200).json({ id: result.rows[0].id });
                //console.log(result)
            }
        });
});

app.delete('/delete/:id', async (req, res) => {
    const pool = openDb();
    const id = parseInt(req.params.id);
    pool.query(
        'DELETE FROM task WHERE id = $1',
        [id],
        (error, result) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(200).json({ id: id });
            }
        });
})
app.listen(port)