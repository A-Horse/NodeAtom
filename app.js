'use strict';

let yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    _ = require('lodash'),
    util = require('util');

let myUtil = require('./lib/util'),
    db = require('./lib/db'),
    xml2js = require('xml2js').parseString;

let defaultConfigYaml =
        yaml.safeLoad(
            fs.readFileSync(
                path.resolve(
                    myUtil.packageRoot, 'config.yaml')));

//console.log("defaultConfigYaml = ", defaultConfigYaml);

//let feeds = {};

_.mapKeys(defaultConfigYaml.feed, (v, k) => {
    console.log(k);
    request(k, (e, res, body) => {
        if ( e ) {
            //throw e;
        }
        xml2js(body, (e, result) => {
            //console.log(result);
            //console.log(util.inspect(result, false, null));
            //console.log(result);
            parseFeed(result);
            //console.log(result.feed.entry);
        });
    });
});

let parseFeed = (result) => {
    let entrys;
    if ( result.feed ) {
        entrys = result.feed.entry;
        
        
    } else if ( result.rss ) {

    }

    entrys.map(function(entry){
        console.log(entry);
    });
};


//db.init(path.join(process.env.HOME, defaultConfigYaml.config.db));


