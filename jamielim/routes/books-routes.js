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
      Book.aggregate([{$group: {_id: 'quantity', total: { $sum: "$quantity" }}}], (err, books) => {
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
      Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book) => {
        if (err) {console.error(err);}
        res.json(book);
      });
    })
    .delete((req, res) => {
      Book.findByIdAndRemove(req.params.id, (err, book) => {
        if (err) {console.error(err);}
        res.json(book);
      });
    });
};