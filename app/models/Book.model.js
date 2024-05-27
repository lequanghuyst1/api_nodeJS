const db = require("../common/connect");

const Book = (book) => {
//   this.BookId = book.BookId;
//   this.BookName = book.BookName;
};

Book.getById = (id, callback) => {
  const sql = "Select * from view_book where BookId = ? ";
  db.query(sql, id, (err, res) => {
    if (err) return callback(err);
    callback(res);
  });
};

Book.getAll = (callback) => {
  const sql = "Select * from view_book";
  db.query(sql, (err, res) => {
    if (err) return callback(err);
    callback(res);
  });
};

module.exports = Book;