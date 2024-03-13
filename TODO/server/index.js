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

//app.get('/',(req: Request, res: response))




//app.post("/new",(req,res) => {
    //const pool = openDb()

    //pool.query
//})