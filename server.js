const express = require('express');
const cookieParser = require('cookie-parser');

const port = 3000;
const app = express();

app.use(cookieParser())
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} => ${req.url}`);
  next();
})

app.use('/login', require('./router/auth'));
app.use('/user', require('./router/user'));
app.use('/book', require('./router/book'));

app.listen(port, console.log(`server is running on port => ${port}`));
