'use strict';

let yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    _ = require('lodash'),
    util = require('util'),
    md5 = require('md5');

let myUtil = require('./lib/util'),
    db = require('./lib/db'),
    xml2js = require('xml2js').parseString,
    show = require('./lib/show');

let feedHash = {};

let defaultConfigYaml =
        yaml.safeLoad(
            fs.readFileSync(
                path.resolve(
                    myUtil.packageRoot, 'config.yaml')));

db.init(path.join(process.env.HOME, defaultConfigYaml.config.db));


var argv = require('optimist').argv;

if ( argv.emacs ) {
       require('./config').emacs = true;
}

_.mapKeys(defaultConfigYaml.feed, (v, k) => {

    request({
        url: k,
        timeout: 3000
    }, (e, res, body) => {

        if (e) {
                show.timeout(e);
                return;
        }

        var hash = md5(body);
        if ( !feedHash[k] ) {
             feedHash = hash;
        } else if ( feedHash[k] === hash ) {
                return;
        }

        xml2js(body, (e, result) => {
            if (e) {
                throw e;
            }
            require('./lib/parse').parse(result);
        });
    });
});
