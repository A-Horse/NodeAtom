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
            'CREATE TABLE atom (id TEXT PRIMARY KEY, '+
                'title TEXT NOT NULL, '+
                'link TEXT NOT NULL, '+
                'content TEXT NOT NULL, '+
                'author TEXT, '+
                'has_read BOOLEAN DEFAULT false, ' +
                'date DATETIME) WITHOUT ROWID;'
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


// let lastInsertRowid = function(table, cb) {
//     db.serialize(() => {
//         db.get(`SELECT last_insert_rowid() from ${table};`, function(err, row) {
//             handleError(err);
//             console.log(row);
//         });
//     });
// };

// let countTable = function(table) {
//     db.serialize(() => {
//         db.get(`SELECT count(*) from ${table};`, function(err, row) {
//             console.log(row);
//         });
//     });
// };

let insertAtom = function(entry, tags) {
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
        );

        tags.map(function(tag){
            db.run(
                `INSERT INTO tags (tag_name, atom_id) VALUES ("${tag}", "${hashId}");`
            );
        });
    });
};

let getNewUnread = (number, cb) => {
    db.serialize(() => {
        db.all(
            `SELECT * from atom where has_read = "false" limit ${number};`,
            function(err, rows){
                return cb(rows);
            });
    });
};

let getEntryByID = (id, cb) => {
    db.serialize(() => {
        db.get(
            `SELECT * from atom where id = "${id}";`,
            function(err, row){
                return cb(row);
        });
    });
};

let setEntryRead = (id, cb) => {
    db.serialize(() => {
        db.run(
            `UPDATE atom set has_read = "true" where id = "${id}"`,
            function(err, row){
                if ( err ) {
                    return false;
                } else {
                    return true;
                }
            });
    });
};


let searchEntryByTitle = (str, limit, cb) => {
    db.serialize(() => {
        db.all(
            `SELECT * from atom where title like "%${str}%" limit ${limit || 30}`,
            function(err, rows){
                return cb(rows);
            });
    });
};

let getEntryByTags = (tags, limit, cb) => {
    let tagQueryStr = tags.map(function(tag){
        return `tags.tag_name = "${tag}"`;
    }).join(' or ');
    db.serialize(() => {
        db.all(
            `SELECT * from atom, tags where ` + tagQueryStr +
                ` and tags.atom_id = atom.id limit ${limit || 30}`,
            function(err, rows){
                console.log(err);
                console.log(rows);
                
            });
    });
};

let deleteAllEntry = (cb) => {
    db.serialize(() => {
        db.run('DELETE FROM atom;', (err, res) => {
            if ( err ) {
                return cb(false);
            } else {
                return cb(true);
            }
        });
    });
};
//init('/Users/soul/nodeAtomDB');
// getNewUnread();
//getEntryByID('01bebe4edde70876b2abbca7629b27e6');
//setEntryRead('01bebe4edde70876b2abbca7629b27e6');
//searchEntryByTitle("面试");
//getEntryByTags(['tech']);

module.exports = {
    init,
    //lastInsertRowid,
    //countTable,
    insertAtom,
    getNewUnread,
    setEntryRead,
    searchEntryByTitle,
    getEntryByTags,
    deleteAllEntry
};
