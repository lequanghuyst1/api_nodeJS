// routes/category.router.js
const express = require('express');
const createBaseRouter = require('./base.router');
const categoryController = require('../controllers/CategoryController');

const router = createBaseRouter(categoryController);

module.exports = router;
