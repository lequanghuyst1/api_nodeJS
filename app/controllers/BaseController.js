// controllers/BaseController.js
const db = require("../common/connect");

class BaseController {
  constructor(tableName) {
    this.tableName = tableName;
    // Ràng buộc ngữ cảnh 'this' cho các phương thức
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  getAll = (req, res) => {
    const sql = `SELECT * FROM view_${this.tableName}`;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  };

  getById = (req, res) => {
    const sql = `SELECT * FROM view_${this.tableName} WHERE ${this.tableName}Id = ?`;
    db.query(sql, [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  };

  delete = (req, res) => {
    const sql = `DELETE FROM ${this.tableName} WHERE ${this.tableName}Id = ?`;
    db.query(sql, [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ affectedRows: results.affectedRows });
    });
  };

  insert = (req, res) => {
    const sql = `CALL Proc_${this.tableName}_Insert(?,?)`;
    db.query(sql, [req.body], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ affectedRows: results.affectedRows });
    });
  };
}

module.exports = BaseController;
