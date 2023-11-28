// Book.js
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');



const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number },
    author: { type: String },
    summary: { type: String },
    publisher: { type: String, required: true },
    pageCount: { type: Number, required: true },
    readPage: { type: Number, required: true },
    reading: { type: Boolean, default: false }, // Set default value to false
    insertedAt: { type: Date, default: Date.now }, // Set default value to current date/time
    updatedAt: { type: Date, default: Date.now }, // Set default value to current date/time
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
