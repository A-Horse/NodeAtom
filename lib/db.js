'use strict';

let sqlite3 = require('sqlite3').verbose();

let util = require('./util');

let handleError = require('./log').handleError;

let db;

let rowId = {};


let createTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE tags (tag_name TEXT, atom_id Integer)');
        db.run('CREATE TABLE atom (title TEXT, link TEXT, content TEXT, author TEXT, date DATETIME, summary TEXT)');
        //db.run();
    });
};


let init  = (dbPath) => {
    if ( util.fileExist(dbPath) ) {
        db = new sqlite3.Database(dbPath);

    } else {
        db = new sqlite3.Database(dbPath);
        createTable();
    }
};


let lastInsertRowid = function(table, cb){
    db.serialize(() => {
        db.get(`SELECT last_insert_rowid() from ${table};`, function(err, row){
            handleError(err);
            console.log(row);
        });
    });
};

let countTable = function(table){
    db.serialize(() => {
        db.get(`SELECT count(*) from ${table};`, function(err, row){
            console.log(row);
        });
    });
};



module.exports = {
    init,
    lastInsertRowid,
    countTable
};
