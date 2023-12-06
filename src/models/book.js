// Book.js
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: { type: String, default: () => nanoid(100) },
    name: { type: String, required: true },
    year: { type: Number },
    author: { type: String },
    summary: { type: String },
    publisher: { type: String, required: true },
    pageCount: { type: Number, required: true },
    readPage: { type: Number, required: true },
    reading: { type: Boolean, default: false },
    insertedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    finished: { type: Boolean, default: false },
});

const Book = mongoose.model('Book', bookSchema);
const createBook = async ({ name, year, author, summary, publisher, pageCount, readPage, reading }) => {
    const finished = pageCount === readPage;

    const book = new Book({
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        });

    await book.save();

    return book.toObject();
};

const findById = async (id) => {
    return await Book.findById(id);
};

module.exports = {
    Book,
    createBook,
    findById,
};
