'use strict';

let colors = require('colors');

let insertErr = (err) => {
    console.log(err);
    console.log('A Error => '.red + err.message.red);
};

let atom = (entry) => {
    
};

module.exports = {
    insertErr,
    atom
};
