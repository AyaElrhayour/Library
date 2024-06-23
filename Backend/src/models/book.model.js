'use strict';
var dbConn = require('../config/db.config');
//book object create
var Book = function (book) {
  this.title = book.title;
  this.author = book.author;
  this.year = book.year;
};
Book.create = function (newB, result) {
  dbConn.query("INSERT INTO books set ?", newB, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Book.findById = function (id, result) {
  dbConn.query("Select * from books where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
Book.findAll = function (result) {
  dbConn.query("Select * from books", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('books : ', res);
      result(null, res);
    }
  });
};
Book.update = function (id, book, result) {
  dbConn.query("UPDATE books SET title=?,author=?,year=? WHERE id = ?", [book.title, book.author,book.year, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Book.delete = function (id, result) {
  dbConn.query("DELETE FROM books WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
module.exports = Book;