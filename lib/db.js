'use strict';

let sqlite3 = require('sqlite3').verbose(),
    md5 = require('md5');

let util = require('./util'),
    show = require('./show');

let handleError = require('./log').handleError;

let db;

let rowId = {};


let createTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE tags (tag_name TEXT, atom_id Text)');
        db.run(
            'CREATE TABLE atom (id TEXT PRIMARY KEY, title TEXT NOT NULL, link TEXT NOT NULL, content TEXT NOT NULL, author TEXT, date DATETIME) WITHOUT ROWID;'
        );
    });
};


let init = (dbPath) => {
    if (util.fileExist(dbPath)) {
        db = new sqlite3.Database(dbPath);

    } else {
        db = new sqlite3.Database(dbPath);
        createTable();
    }
};


let lastInsertRowid = function(table, cb) {
    db.serialize(() => {
        db.get(`SELECT last_insert_rowid() from ${table};`, function(err, row) {
            handleError(err);
            console.log(row);
        });
    });
};

let countTable = function(table) {
    db.serialize(() => {
        db.get(`SELECT count(*) from ${table};`, function(err, row) {
            console.log(row);
        });
    });
};

let insertAtom = function(entry) {
    if ( !entry.content ) {
        throw "Entry has not content!";
    }
    let hashId = md5(entry.content);
    
    db.serialize(() => {
        db.run(
            'INSERT INTO atom (id, title, link, content, author, date) VALUES (?, ?, ?, ?, ?, ?)',
            [
                hashId,
                entry.title,
                entry.link,
                entry.content,
                entry.author,
                entry.date
            ], function(err){
                
                if ( err ) {
                    show.insertErr(err);
                } else {
                    show.atom(entry);
                }

            }
        )
    });
};

module.exports = {
    init,
    lastInsertRowid,
    countTable,
    insertAtom
};
