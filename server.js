// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('usersapp', ['usersapp']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.usersapp.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {

  db.usersapp.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;

  db.usersapp.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;

  db.usersapp.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;

  db.usersapp.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {firstName: req.body.firstName,lastName: req.body.lastName, email: req.body.email, mobile: req.body.mobile}},
        new: true}, function (err, doc) {
        res.json(doc);
      }
  );
});

app.listen(3000);
console.log("Server running on port 3000");