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
    xml2js = require('xml2js').parseString;

let feedHash = {};

let defaultConfigYaml =
        yaml.safeLoad(
            fs.readFileSync(
                path.resolve(
                    myUtil.packageRoot, 'config.yaml')));

db.init(path.join(process.env.HOME, defaultConfigYaml.config.db));



_.mapKeys(defaultConfigYaml.feed, (v, k) => {

    request(k, (e, res, body) => {

        if (e) {
            throw e;
        }

        //var hash = md5(body);
        //console.log("hash = ", hash);


        xml2js(body, (e, result) => {
            //console.log(result);
            //console.log(util.inspect(result, false, null));
            //console.log(result);
            if (e) {
                throw e;
            }
            require('./lib/parse').parse(result);
            
            //db.insertAtom(res);

        });
    });
});
