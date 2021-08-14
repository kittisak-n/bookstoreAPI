const router = require("express").Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    console.log(req.header.Authorization);
    const recoment = await fetch('https://scb-test-book-publisher.herokuapp.com/books/recommendation', { method: 'GET' })
        .then(res => res.json())
        .catch(err => res.status(500).send(err));
    const normal = await fetch('https://scb-test-book-publisher.herokuapp.com/books', { method: 'GET' })
        .then(res => res.json())
        .catch(err => res.status(500).send(err));
    const response = await duduplicateBook(recoment.concat(normal), 'book_name');
    res.status(200).json({ book: response }).send();
});

const duduplicateBook = async (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

module.exports = router;



