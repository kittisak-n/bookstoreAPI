const express = require("express");
const cookiesession = require("cookie-session");
const db = require('./../connect');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body)

    //set pamiter
    const { username, password, date_of_birth } = req.body
    
    // state 1 check user in database;
    db.query(`SELECT * FROM account WHERE ac_username = ? `, [username], (err, results) => {

        if (err) res.status(400).send(err);
        if (results.length != 0) res.status(417).send("this username already exists. can't make the transaction.");

        //state 2 insert user if not fount user in database
        db.query(`INSERT INTO account VALUES (?, ?, ?)`, [username, password, date_of_birth], (err, result) => {
            if (err) res.status(400).send(err);
            res.status(200).send();

        })
    })
});

module.exports = router;



