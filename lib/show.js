'use strict';

let colors = require('colors');

let insertErr = (err) => {
    if ( err.code === 'SQLITE_CONSTRAINT' ) {
        //no-op
    } else {
        console.log('                                         '.bgRed);
        console.log('A Error => '.red + err.message.red);
        console.log('                                         '.bgRed);
    }
};

let atom = (entry) => {
    console.log('Title'.bgGreen.white + ' ' + '=> '.green + entry.title);
    console.log('link => '.magenta + entry.link.underline);
    console.log();
};

let timeout = (err) => {
      if ( e.message === 'ETIMEOUT' ) {
         console.log('-------------------------------------------'.red);
         console.log('ETIMEDOUT => '.bgRed + k.red);
         console.log('-------------------------------------------'.red);
      }  


};

module.exports = {
    insertErr,
    atom
};
