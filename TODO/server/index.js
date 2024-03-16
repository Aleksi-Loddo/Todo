const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()
app.use(cors())
const port = 3001

app.get("/",(req,res) => {
    res.status(200).json({result: 'success'})
})

app.listen(port)

app.get('/',(req, res) => {
    const pool = openDb()
    pool.query('Select * FROM task', (error, result) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json(result.row)
    })
})

const openDb = () => {  //make sure it works properrly!!!!
    const pool = new Pool ({
        user: "postgres",
        host: "localhost",
        database: "todo",
        password: "2003",
        port: 5432
    })
    return pool
}

app.post("/new",(req,res) => {
    const pool = openDb()
    pool.query('insert into task (description) values ($1) returning')
    [req.body.description],
    (error,result) => {
        if (error) {
            res.status(500).json({error: error.message})
        } else {
            res.status(200).json({id: result.row[0].id})
        }
    }
})