const express = require('express');
const bodyParser = require('body-parser');
const bookRoute = require('../routes/books');
const app = express();
const port = 900;

app.use(bodyParser.json());
app.use('/books', bookRoute);

app.listen(port, () => {
    console.log('listening on port ${9000}');
});