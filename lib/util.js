'use strict';

let path = require('path'),
    fs = require('fs'),
    md5 = require('md5');

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

let checkmd5 = (content) => md5(content);

module.exports = {
    packageRoot: packageRoot(),
    fileExist,
    checkmd5
};
