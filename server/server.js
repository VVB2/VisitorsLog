require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = db;

const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Route to get all data for latest data
app.get('/api/get', (req, res) => {
    db.query(
        `SELECT * FROM sensor_log WHERE date = ${moment()
            .tz('Asia/Hong_Kong')
            .format('YYYY-MM-DD')};`,
        (err, result) => {
            if (err) {
                res.send({ status: 404, data: err });
            }
            res.send({ status: 200, data: result });
        }
    );
});

app.get('/api/getAll', (req, res) => {
    db.query('SELECT * FROM sensor_log;', (err, result) => {
        if (err) {
            res.send({ status: 404, data: err });
        }
        res.send({ status: 200, data: result });
    });
});

//Login route
app.post('/api/login', express.json(), (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        db.query(
            'SELECT * FROM `users` WHERE `username` = ? AND `password` = ?',
            [username, password],
            function (err, rows) {
                if (err)
                    res.send({ status: 505, error: 'Internal server error' });
                if (rows.length <= 0) {
                    res.send({
                        status: 404,
                        error: 'Email and Password combinations do not match ',
                    });
                } else {
                    res.send({ status: 200, success: 'Successful Login' });
                }
            }
        );
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
