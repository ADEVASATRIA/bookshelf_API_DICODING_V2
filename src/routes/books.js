const express = require('express');
const router = express.Router();

// Import Module MODELS data buku yang digunakan
const { Book } = require('../models/book');

// Import module controllers yang di pakai Untuk CRUD Data Buku
const { updateBook } = require('../controllers/book_controllers')
const { addBook } = require('../controllers/book_controllers')
const { getAllBooks } = require('../controllers/book_controllers')
const { getBookDetails } = require('../controllers/book_controllers')
const { deleteBook } = require('../controllers/book_controllers')

// Routes untuk menambahkan buku baru
router.post('/', addBook);

// Routes untuk Menampilkan Semua Data Buku
router.get('/', getAllBooks);

// Routes untuk Menampilkan Data Buku Sesui Dengan ID yang diminta
router.get('/:bookId', getBookDetails);

// Routes untuk mengubah data buku sesuai dengan ID yang diminta
router.put('/:id', updateBook);

// Routes untuk menghapus data buku sesuai dengan ID yang diminta
router.delete('/:bookId', deleteBook);


// List untuk semua endpoint Routes yang Ada / Digunakan
const listEndpoints = require('express-list-endpoints');
console.log(listEndpoints(router));


module.exports = router;

