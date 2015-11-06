'use strict';

let path = require('path'),
    fs = require('fs');

let fileExist = (path) => {
    try {
        let stats = fs.lstatSync(path);
        if ( stats.isFile() ) {
            return true;
        }
    } catch (e) {
        return false;
    }
};

let packageRoot = ()  => path.join(__dirname, '..');

module.exports = {
    packageRoot: packageRoot(),
    fileExist
};
