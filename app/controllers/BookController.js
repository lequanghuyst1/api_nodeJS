// controllers/BookController.js
const BaseController = require('./BaseController');

class BookController extends BaseController {
  constructor() {
    super("Book");
  }
}

module.exports = new BookController();
