'use strict';

let colors = require('colors'),
    path = require('path');

let notifier = require('node-notifier'),
    opener = require("opener");

let notifierQueue = [];



let emodule = {

    notifierStart: () => {
        setInterval(() => {
            if ( notifierQueue.length !== 0 ) {
                notifier.notify(notifierQueue.shift());
            }
        }, 2000);
        notifier.on('click', function (notifierObject, options) {
            opener(options.link);
        });
    },
    
    insertErr: (err) => {
        if ( global.emacs ) {
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
        if ( global.notifier ) {
            notifierQueue.push({
                title: entry.title,
                message: entry.content,
                link: entry.link,
                icon: path.join(__dirname, '../img/so.png'),
                sound: true, 
                wait: true,
                open: entry.link
            });
        }
        if ( global.emacs ) {
            console.log(JSON.stringify(entry));
        } else {
            console.log('Title'.bgGreen.white + ' ' + '=> '.green + entry.title);
            console.log('link => '.magenta + entry.link.underline);
            console.log();
        }
    },
    
    timeout: (err) => {
        if ( global.emacs ) {
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
