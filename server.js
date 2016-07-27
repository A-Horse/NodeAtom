'use strict';

let express = require('express');

let app = express();

let db = require('./lib/db.js');

let serverPort = require('./config').serverPort;

app.get('/new-unread/:number', (req, res) => {
    let number = req.params.number;
    db.getNewUnread(number, function(rows){
        res.send({result: rows});
    });
});

app.get('/new/:number', (req, res) => {
    let number = req.params.number;
    db.getNew(number, function(rows){
        res.send({result: rows});
    });
});


app.get('/entry/:id', (req, res) => {
    let id = req.params.id;
    db.getEntryByID(id, function(row){
        if ( row ) {
          res.send(row);
        }
    });
});

app.get('/read-entry/:id', (req, res) => {
    let id = req.params.id;
    db.setEntryRead(id, function(res){
        res.send({
            result: res
        });
    });
});

app.get('/search/title/:str', function(req, res){
    let str = req.params.str;
    db.searchEntryByTitle(str, 30, function(rows){
        if ( rows ) {
            res.send(rows);
        }
    });
});

app.get('/tags/', function(req, res){
    let tags = req.query.tags;
    db.getEntryByTags(tags, 30, (rows) => {
        if ( rows ) {
            res.send(rows);
        }
    });
});


module.exports = function(port){
    app.listen(port);
};
