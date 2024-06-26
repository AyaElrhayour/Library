import Book from '../models/book.model.js';

export const findAll = (req, res) => {
  Book.findAll((err, books) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(books);
    }
  });
};

export const create = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required fields' });
  } else {
    const newBook = new Book(req.body);
    Book.create(newBook, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json({ error: false, message: "Book added successfully!", data: book });
      }
    });
  }
};

export const findById = (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Book with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ message: "Error retrieving Book with id " + req.params.id });
      }
    } else {
      res.send(book);
    }
  });
};

export const update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required fields' });
  } else {
    Book.update(req.params.id, new Book(req.body), (err, book) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({ message: `Book with id ${req.params.id} not found.` });
        } else {
          res.status(500).send({ message: "Error updating Book with id " + req.params.id });
        }
      } else {
        res.json({ error: false, message: 'Book successfully updated', data: book });
      }
    });
  }
};

export const remove = (req, res) => {
  Book.delete(req.params.id, (err, book) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Book with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ message: "Could not delete Book with id " + req.params.id });
      }
    } else {
      res.json({ error: false, message: 'Book successfully deleted' });
    }
  });
};