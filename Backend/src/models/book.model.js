import dbConn from '../config/db.config.js';

class Book {
  constructor(book) {
    this.title = book.title;
    this.author = book.author;
    this.year = book.year;
  }

  static create(newB, result) {
    dbConn.query(
      "INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *",
      [newB.title, newB.author, newB.year],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res.rows[0]);
        }
      }
    );
  }

  static findById(id, result) {
    dbConn.query("SELECT * FROM books WHERE id = $1", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (res.rows.length) {
        result(null, res.rows[0]);
      } else {
        result({ kind: "not_found" }, null);
      }
    });
  }

  static findAll(result) {
    dbConn.query("SELECT * FROM books", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res.rows);
      }
    });
  }

  static update(id, book, result) {
    dbConn.query(
      "UPDATE books SET title=$1, author=$2, year=$3 WHERE id = $4 RETURNING *",
      [book.title, book.author, book.year, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else if (res.rows.length === 0) {
          result({ kind: "not_found" }, null);
        } else {
          result(null, res.rows[0]);
        }
      }
    );
  }

  static delete(id, result) {
    dbConn.query("DELETE FROM books WHERE id = $1 RETURNING *", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else if (res.rowCount === 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res);
      }
    });
  }
}

export default Book;