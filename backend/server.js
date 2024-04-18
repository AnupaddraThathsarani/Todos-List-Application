const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const moment = require("moment");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tododb"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM todo;";

    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/pending", (req, res) => {
    const sql = "SELECT * FROM todo WHERE `todo`.`Status` = 0;";

    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/completed", (req, res) => {
    const sql = "SELECT * FROM todo WHERE `todo`.`Status` = 1;";

    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO `todo` (`Description`, `Date`) VALUES (?, ?);";
    const values = [
        req.body.description,
        moment(req.body.selectedDate).format('YYYY-MM-DD')
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM todo WHERE `todo`.`todo_id` = ?;"
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE `todo` SET `Description` = ?, `Date` = ? WHERE `todo`.`todo_id` = ?;";
    const values = [
        req.body.description,
        moment.utc(req.body.selectedDate).format('YYYY-MM-DD'),
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});


app.delete('/todo/:id', (req, res) => {
    const sql = "DELETE FROM `todo` WHERE `todo`.`todo_id` = ?;"
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/completed/:id', (req, res) => {
    const sql = "UPDATE `todo` SET `Status` = 1 WHERE `todo`.`todo_id` = ?;";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})