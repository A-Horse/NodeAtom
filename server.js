'use strict';

let express = require('express');

let app = express();

let db = require('./lib/db.js');

let serverPort = require('./config').serverPort;

app.get('/new-unread/:number', (req, res) => {
    let number = req.params.number;
    db.getNewUnread(number, function(rows){
        res.send(rows);
    });
});

app.get('/entry/:id', (req, res) => {
    let id = req.params.id;
    db.getEntryByID(id, function(row){
        
    });
});

app.listen(serverPort);








