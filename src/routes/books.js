// books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Ubah path sesuai dengan struktur proyek Anda
const books = [];

// Endpoint untuk menambah buku
router.post('/', async (req, res) => {
    try {
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 'Fail',
                message: "Gagal menambahkan buku. Mohon isi nama buku",
            });
        }

        if (readPage > pageCount) {
            return res.status(400).json({
                status: 'Fail',
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            });
        }

        const newBook = new Book({
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        });

        await newBook.save();

        res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: newBook.id,
            },
        });
    } catch (error) {
        console.error('Error adding book to database', error);
        res.status(500).json({
            status: 'Error',
            message: 'Gagal menambahkan buku ke database',
        });
    }
});

// Endpoint untuk menampilkan semua buku
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}, { __v: 0, updatedAt: 0, insertedAt: 0 });
            res.status(200).json({
                status: 'success',
                data: {
                    books: books.map(book => ({
                        id: book._id.toString(),
                        name: book.name,
                        publisher: book.publisher,
                    })),
                },
            });

    } catch (error) {
        console.error('Error retrieving books from database', error);
        res.status(500).json({
            status: 'Error',
            message: 'Gagal mendapatkan daftar buku dari database',
        });
    }
});

// Endpoint untuk menampilkan buku sesuai dengan ID yang diminta
router.get('/:bookId', async (req, res) => {
    try {
        const bookId = req.params.bookId;

        // Pengecekan bookId
        if (!bookId) {
            return res.status(404).json({
                status: 'fail',
                message: 'Buku tidak ditemukan',
            });
        }

        const book = await Book.findOne({ _id: bookId }, { __v: 0, updatedAt: 0, insertedAt: 0 });

        if (!book) {
            return res.status(404).json({
                status: 'fail',
                message: 'Buku tidak ditemukan',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                book,
            },
        });
    } catch (error) {
        console.error('Error retrieving book details from database', error);
        res.status(500).json({
            status: 'Error',
            message: 'Gagal mendapatkan detail buku dari database',
        });
    }
});




module.exports = router;
