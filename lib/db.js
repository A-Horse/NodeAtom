'use strict';

let sqlite3 = require('sqlite3').verbose();

let util = require('./util');

let db;

let createTable = () => {

};

let init  = (dbPath) => {
    if ( util.fileExist(dbPath) ) {
        
    } else {
        
    }
};

module.exports = {
    init
};
