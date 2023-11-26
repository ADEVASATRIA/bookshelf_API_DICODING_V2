const express = require('express');
const router = express.Router();
// const { nanoid } = require('nanoid');
const { nanoid } = require('nanoid');

const books = [];

router.post('/', (req,res) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        readPage,
        reading,
    } = req.body;

    // Cek apakah properti 'name' ada di dalam request body
    if(!name){
        return res.status(400).json({
            status: 'Fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
    }

    // cek apakah nilai 'readPage' lebih besar dari 'pageCount'
    if(readPage > req.body.pageCount){
        return res.status(400).json({
            status: 'Fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
    }

    const id =  nanoid();
    const insertAt = new Date().toISOString();
    const updateAt = insertAt;
    const finished = (req.body.pageCount === readPage);

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount: req.body.pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });

});

module.exports = router;