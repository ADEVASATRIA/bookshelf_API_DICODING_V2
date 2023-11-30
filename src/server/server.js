const express = require('express');
const bodyParser = require('body-parser');
const bookRoute = require('../routes/books');
const app = express();
const port = 9000;
const mongoose = require('mongoose');



app.use(bodyParser.json());
app.use('/books', bookRoute);



mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://admin:adeva10MEI2002@testingapiv1.ojgr6ub.mongodb.net/Bookshelf_API_dicoding_v2?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to Database');
    app.listen(port, () => {
        console.log('Backend is Running in server http://localhost:9000');
    }); 
}).catch(() => {
    console.log('Connection Failed');
})