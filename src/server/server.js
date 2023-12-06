const express = require('express');
const bodyParser = require('body-parser');
const bookRoute = require('../routes/books');
const app = express();
const port = 9000;
const mongoose = require('mongoose');
require('dotenv').config();



app.use(bodyParser.json());
app.use('/books', bookRoute);



mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to Database');
    app.listen(port, () => {
        console.log('Backend is Running in server http://localhost:9000');
    }); 
}).catch(() => {
    console.log('Connection Failed');
})