require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// const morgan = require('morgan')

// app.use(morgan('combined'))

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const booksRoutes = require("./app/routers/book.router");
const categoriesRoutes = require("./app/routers/category.router");

// Sử dụng router từ booksRoutes và truyền tên bảng
app.use("/api/books", booksRoutes);
app.use("/api/categories", categoriesRoutes);

app.listen(port);

console.log("RESTful API server started on: " + port);
