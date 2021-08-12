const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-access-token");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
})

//import router !
const user = require('./router/user');
const book = require('./router/book');


app.use((req, res, next) => {
  console.log(`${req.method} => ${req.url}`);
  next();
})

//validation authtoken "SCB"

const validateAuthToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization == "SCB") {
    next();
  } else {
    res.status(403).send('Attempting to access that we do not have permission to.');
  }
}

app.get('/', validateAuthToken, (req, res) => {
  res.send('Node.js Bookstore api by test SCB')
})
app.use('/login', validateAuthToken, user);
app.use('/user', validateAuthToken, user);
app.use('/book', validateAuthToken, book);


app.listen(3000, console.log("API RUNNING PORT => 3000"));
