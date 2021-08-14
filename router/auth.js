const router = require('express').Router()
const jwt = require('jsonwebtoken')
const db = require('./../connect');
const { check, validationResult } = require('express-validator');

router.post('/', (req, res) => {
    const { username, password } = req.body;
    db.query(
        `   
            SELECT ac_id, ac_username 
            FROM account 
            WHERE ac_username = ? and ac_password = ?
        `,
        [username, password],
        (err, result) => {
            if (err) res.status(500).json.apply(err).send();
            else if (result.length == 0) res.status(200).json({ msg: 'Not found User !' })
            else {
                res.cookie('Authentication', jwt.sign({ ac_id: result[0].ac_id, username: result[0].ac_username }, 'U0NCVGVjaFg='), { httpOnly: false })
                res.status(200)
                res.end();
            }
        })
})

module.exports = router