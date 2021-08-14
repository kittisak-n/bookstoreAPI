const router = require('express').Router();
const db = require('./../connect');
const { check, validationResult } = require('express-validator');
const checkAuth = require("./../middleware/checkAuth");
const fetch = require('node-fetch');

router.get('/', checkAuth, (req, res) => {
    db.query("SELECT ac_username as username, ac_password as password, DATE_FORMAT(ac_birthdate,'%d/%m/%Y') as date_of_birth FROM account WHERE ac_username = ?", [req.user], (err, result) => {
        if (err) res.status(500).send(err);
        else {
            const data = result[0];
            data['books'] = [];
            db.query(
                `  
                    SELECT rcd.rcdt_book_id as books
                    FROM record rc
                    LEFT JOIN record_detail rcd ON rc.record_id = rcd.rcdt_record_id 
                    WHERE rc.racord_ac_id = ?
                `,
                [req.ac_id], (err, result) => {
                    if (err) res.status(500).send(err);
                    else {
                        result.forEach(ele => {
                            data['books'].push(ele.books);
                        })
                        res.status(200).json(data).send()
                    }
                })
        }
    })
})

router.post('/',
    check("username").exists().withMessage('Username not found').notEmpty().withMessage('Username required'),
    check("password").exists().withMessage('Username not found').notEmpty().withMessage('Password required'),
    check("date_of_birth").exists().withMessage('Username noy found').notEmpty().withMessage('Date_of_birth required'),
    async (req, res) => {
        const { username, password, date_of_birth } = req.body
        const format = /[`!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
        const formatDate = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\?~]/;
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(401).json(errors).send();
        if (format.test(username) || format.test(password)) res.status(401).send('username or password is special characters')
        if (formatDate.test(date_of_birth)) res.status(401).send('date_of_birth is special characters');
        else {
            db.query(`SELECT * FROM account WHERE ac_username = ? `, [username], (err, results) => {
                if (err) res.status(40).send(err);
                if (results.length != 0) res.status(417).send("this username already exists. can't make the transaction.");
                db.query(`INSERT INTO account(ac_username,ac_password,ac_birthdate) VALUES (?, ?, ?)`, [username, password, date_of_birth.split("/").reverse().join("-")], (err, result) => {
                    if (err) res.status(400).send(err);
                    res.status(200).send('OK');
                })
            })
        }
    }
);

router.post('/order', checkAuth, check("order").exists().withMessage('order not found').notEmpty().withMessage('order required'), async (req, res) => {
    const { order } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(401).json(errors).send();
    if (! await checkTypeNumber(order)) res.status(401).send('Value in order is not number');

    const list = await fetch('https://scb-test-book-publisher.herokuapp.com/books', { method: 'GET' })
        .then(res => res.json())
        .catch(err => res.status(500).send(err));
    const book = await filterBook(list, order);
    db.query('INSERT INTO record(racord_ac_id) VALUES (?)', [req.ac_id], (err, result) => {
        const insertID = result.insertId
        book.order.forEach((ele, index, array) => {
            if (array.length - 1 === index) {
                db.query('INSERT INTO record_detail(rcdt_record_id, rcdt_book_id) VALUES (?, ?)', [insertID, ele.id], (err, result) => {
                    if (err) {
                        res.status(401).send()
                    } else res.status(200).json({ "price": book.price.toFixed(2) }).send();
                });
            } else {
                db.query('INSERT INTO record_detail(rcdt_record_id, rcdt_book_id) VALUES (?, ?)', [insertID, ele.id], (err, result) => {
                    if (err) {
                        res.status(401).send();
                    }
                });
            }

        })
    });
})

router.delete('/', checkAuth, async (req, res) => {
    await db.query("DELETE FROM record_detail WHERE rcdt_record_id in (SELECT record_id FROM record WHERE racord_ac_id = ?)", [req.ac_id], (err, result) => {
        if (err) res.status(401).send();
        else {
            db.query("DELETE FROM record WHERE racord_ac_id = ?", [req.ac_id], (err, result) => {
                if (err) res.status(401).send();
                else {
                    db.query("DELETE FROM account WHERE ac_id = ? ", [req.ac_id], (err, result) => {
                        if (err) res.status(401).send();
                        else {
                            res.clearCookie("Authentication");
                            res.status(200).send();
                        }
                    })
                }
            })
        }
    })
})

const checkTypeNumber = (order) => {
    return true;
}

const filterBook = (book, order) => {
    let bookselect = {
        price: 0,
        order: [],
    }
    order.forEach(element => {
        console.log(book[element]);
        bookselect.order.push(book.find(ele => { return ele.id == element }))
    });
    bookselect.price = bookselect.order.map(item => item.price).reduce((prev, next) => prev + next)
    return bookselect;
}

module.exports = router;



