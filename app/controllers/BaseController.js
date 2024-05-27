// controllers/BaseController.js
const db = require("../common/connect");
const { v4: uuidv4 } = require("uuid");
const filed = {
  category: [
    "CategoryId",
    "CategoryCode",
    "CategoryName",
    "CategorySlug",
    "Description",
    "CreatedDate",
    "CreatedBy",
    "ModifiedDate",
    "ModifiedBy",
  ],
};
class BaseController {
  constructor(tableName) {
    this.tableName = tableName;
    // Ràng buộc ngữ cảnh 'this' cho các phương thức
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  generateSlug = (entityName) => {
    let output = entityName.toLowerCase();

    // Loại bỏ các ký tự đặc biệt
    const specialChars = [
      ".",
      ",",
      ";",
      ":",
      "?",
      "%",
      "$",
      "&",
      "#",
      "*",
      "!",
      "_",
      "@",
      "+",
      "(",
      ")",
      "[",
      "]",
      "/",
      "\\",
      "-",
      "'",
      '"',
    ];
    specialChars.forEach((char) => {
      output = output.replace(new RegExp(`\\${char}`, "g"), " ");
    });

    // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    output = output.trim();

    // Thay thế các ký tự tiếng Việt có dấu thành không dấu
    const accentsMap = [
      { base: "a", chars: "áàảãạăắằẳẵặâấầẩẫậ" },
      { base: "e", chars: "éèẻẽẹêếềểễệ" },
      { base: "i", chars: "íìỉĩị" },
      { base: "o", chars: "óòỏõọôốồổỗộơớờởỡợ" },
      { base: "u", chars: "úùủũụưứừửữự" },
      { base: "y", chars: "ýỳỷỹỵ" },
      { base: "d", chars: "đ" },
    ];

    accentsMap.forEach((map) => {
      map.chars.split("").forEach((char) => {
        output = output.replace(new RegExp(char, "g"), map.base);
      });
    });

    // Loại bỏ khoảng trắng và thay thế bằng dấu gạch ngang
    output = output.replace(/\s+/g, "-");

    // Loại bỏ các dấu gạch ngang liên tiếp
    output = output.replace(/--+/g, "-");

    return output;
  };

  // Sử dụng hàm để tạo slug

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
    const uuid = uuidv4();
    
    const filedTable = filed[this.tableName.toLowerCase()];
    const columnsInsert = filedTable.join(", ");
    const paramProc = filedTable.map(() => "?").join(", ");

    let values = [];

    filedTable.forEach((item) => {
      if (item === `${this.tableName}Id`) {
        //Tạo Id mới
        req.body[item] = uuid;
      }
      if (item === `${this.tableName}Slug`) {
        req.body[item] = this.generateSlug(req.body[`${this.tableName}Name`]);
      }
      if (item === "CreatedDate") {
        req.body[item] = new Date();
      }
      if (req.body[item] === undefined) {
        req.body[item] = null;
      }
      values.push(req.body[item]);
    });
    
    const sql = `INSERT INTO ${this.tableName} (${columnsInsert}) VALUES (${paramProc})`;

    db.query(sql, values, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ affectedRows: results.affectedRows });
    });
  };
}

module.exports = BaseController;
