// routes/book.router.js
const express = require('express');
const createBaseRouter = require('./base.router');
const bookController = require('../controllers/BookController');

const router = createBaseRouter(bookController);

module.exports = router;
