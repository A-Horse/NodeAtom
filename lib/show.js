'use strict';

let colors = require('colors');


let emacs = require('../config').emacs;

let emodule = {
    insertErr: (err) => {
        if ( emacs ) {
            return;
        }

        if ( err.code === 'SQLITE_CONSTRAINT' ) {
            //no-op
        } else {
            console.log('                                         '.bgRed);
            console.log('A Error => '.red + err.message.red);
            console.log('                                         '.bgRed);
        }
    },
    
    atom: (entry) => {
        if ( !emacs ) {
            console.log(entry);
        } else {
            console.log('Title'.bgGreen.white + ' ' + '=> '.green + entry.title);
            console.log('link => '.magenta + entry.link.underline);
            console.log();
        }
    },
    
    timeout: (err) => {
        if ( emacs ) {
            return;
        }
        if ( err.message === 'ETIMEOUT' ) {
            console.log('-------------------------------------------'.red);
            console.log('ETIMEDOUT => '.bgRed);
            console.log('-------------------------------------------'.red);
        }  
    }
};

// Object.keys(emodule).map((k) => {
//     let oldFn = emodule[k];
//     emodule[k] = function() {
//         if ( !require('./../config').emacs ) {
//             oldFn.apply(emodule, arguments);
//         } 
//     };
// });

module.exports = emodule;
