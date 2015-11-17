'use strict';

let sqlite3 = require('sqlite3').verbose();

let util = require('./util');

let handleError = require('./log').handleError;

let db;

let rowId = {};


let createTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE tags (tag_name TEXT, atom_id Integer)');
        db.run('CREATE TABLE atom (title TEXT, link TEXT, content TEXT, author TEXT, date TEXT, summary TEXT)');
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

let insertAtom = (entry) => {
    //console.log(entry);
    console.log(entry.title[0]._);
    console.log(entry.link[0].$.href);
    console.log(entry.summary[0]._);
    console.log(entry.author[0].name[0]);
    // db.serialize(() => {
    //     db.run('INSERT INTO atom (title, link, content, author) VALUES (?, ?, ?, ?)',
    //            [1, 2, 3, 4], function(){
    //                db.each('select last_insert_rowid() from atom', function(err, row){
    //                    console.log(row);
    //                });
    //            });
    // });
};


module.exports = {
    init,
    insertAtom,
    lastInsertRowid,
    countTable
};
