'use strict';

let sqlite3 = require('sqlite3').verbose();

let util = require('./util');

let db;


let createTable = () => {
    db.serialize(() => {
        db.run('CREATE TABLE tags (tag_name TEXT, atom_id Integer)');

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


module.exports = {
    init
};
