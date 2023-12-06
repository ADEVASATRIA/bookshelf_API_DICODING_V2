const { findById } = require('../models/book');
const { createBook } = require('../models/book');
const { Book } = require('../models/book');

// Controller untuk menambahkan buku
const addBook = async (req, res) => {
    try {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

        // Validation
        if (!name) {
            return res.status(400).json({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' });
        }

        if (readPage > pageCount) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            });
        }

        // Create book using Mongoose model
        const book = await createBook({
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        });

        res.status(201).json({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId: book.id } });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
    }
};

// Controller untuk mengubah data buku sesuai dengan ID yang diminta
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
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

        // Validasi data
        if (!name) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
        }

        if (readPage > pageCount) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
        }

        // Cek apakah buku dengan ID yang diberikan ada
        const existingBook = await findById(id);
        if (!existingBook) {
            return res.status(404).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            });
        }

        // Lakukan update
        existingBook.name = name;
        existingBook.year = year;
        existingBook.author = author;
        existingBook.summary = summary;
        existingBook.publisher = publisher;
        existingBook.pageCount = pageCount;
        existingBook.readPage = readPage;
        existingBook.reading = reading;

        // Simpan perubahan
        await existingBook.save();

        // Berhasil di UPDATE
        res.status(200).json({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });

    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error',
        });
    }
};

// Controller untuk menampilkan semua data buku 
const getAllBooks = async (req, res) => {
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
};

// Controller untuk menampilkan data buku sesuai dengan ID yang diminta
const getBookDetails = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Cari buku berdasarkan ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ status: 'fail', message: 'Buku tidak ditemukan' });
        }

        res.status(200).json({ status: 'success', data: { book } });
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
    }
};

// Controller untuk Menghapus data menggunakan ID yang diminta

const deleteBook = async ( req, res) => {
    try {
        const { bookId } = req.params;

        // Cari buku berdasarkan ID
        const book = await Book.findById(bookId);

        if(!book){
            return res.status(404).json({ status: 'fail', message:'Buku gagal dihapus. Id tidak ditemukan'});
        }

        // Hapus buku
        await book.deleteOne();

        res.status(200).json({ status: 'success', message: 'Buku berhasil dihapus'});
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
    }
};

module.exports = {
    updateBook,
    addBook,
    getAllBooks,
    getBookDetails,
    deleteBook,
};