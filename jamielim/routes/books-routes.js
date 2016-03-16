'use strict';

let Book = require(__dirname + '/../models/book-model.js');

module.exports = (apiRouter) => {
  apiRouter.route('/books')
    .get((req, res) => {
      Book.find({}, (err, books) => {
        if (err) {console.error(err);}
        res.json({data: books});
      });
    })
    .post((req, res) => {
      var newBook = new Book(req.body);
      newBook.save((err, book) => {
        if (err) {console.error(err);}
        res.json(book);
      });
    });

  apiRouter.route('/books/totalQuantity')
    .get((req, res) => {
      Book.aggregate([{$group: {_id: 'books', total: {$sum:1}}}], (err, books) => {
        if (err) {console.error(err);}
        res.json(books);
      });
    });

  apiRouter.route('/books/:id')
    .get((req, res) => {
      Book.findById(req.params.id, (err, book) => {
        res.json(book);
      });
    })
    .put((req, res) => {
      Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) {console.error(err);}
        res.json(book);
      });
    })
    .delete((req, res) => {
      Book.findOneAndRemove({'_id': req.params.id}, (err, book) => {
        if (err) {console.error(err);}
        res.json(book);
      });
    });
};