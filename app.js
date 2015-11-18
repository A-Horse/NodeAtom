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

let parseFeed = (result) => {
    let entrys;

    if ( result.feed ) {
        entrys = result.feed.entry;
        
        entrys.map(function(entry){
            db.insertFeed(entry);
            console.log('----------------');
        });
        
    } else if ( result.rss ) {
        
        entrys = result.rss.channel[0].item;

        entrys.map((entry) => {
            console.log('----------------');
            db.insertRss(entry);
        });
    }
};


// xml 转成 json 有重大问题，我也不想这样写
let tryAllPossible

let insertFeed = (entry) => {
    console.log(entry);

    
    console.log(entry.title[0] || entry.title[0]._);
    console.log('*******************');
    
    console.log(entry.link[0].$.href);
    console.log('*******************');
    
    console.log(entry.content[0]._);
    console.log('*******************');
    
    console.log(entry.author[0].name[0]);
    console.log('*******************');
    
    console.log(entry.published[0]) //|| entry.published[0]);
    console.log('*******************');
    
    //nullprogram
    //  console.log(entry.title[0]);
    // console.log(entry.link[0].$.href);
    // console.log(entry.content[0]._);
    // console.log(entry.updated[0]);
    

    //ve2x
    //  console.log(entry.title[0]);
    // console.log(entry.link[0].$.href);
    // console.log(entry.content[0]._);
    // console.log(entry.author[0].name[0]);
    // console.log(entry.published[0]);
    
    
    //stackoverflow
    
    //  console.log(entry.title[0]._);
    // console.log(entry.link[0].$.href);
    // console.log(entry.summary[0]._);
    // console.log(entry.author[0].name[0]);
    // console.log(entry.published[0]);
    
    // db.serialize(() => {
    //     db.run('INSERT INTO atom (title, link, summary, author, data) VALUES (?, ?, ?, ?)',
    //            [
    //                entry.title[0]._,
    //                entry.link[0].$.href,
    //                entry.summary[0]._,
    //                entry.author[0].name[0]
    //            ], function(){
    //                db.each('select last_insert_rowid() from atom', function(err, row){
    //                    console.log(row);
    //                });
    //            });
    // });
};



let insertRss = (entry) => {

    console.log(entry);
    
    console.log(entry.title[0]);
    console.log('*******************');
    
    console.log(entry.link[0]);
    console.log('*******************');
    
    console.log(entry['content:encoded'][0] || entry.description[0]);
    console.log('*******************');
    
    console.log(entry['dc:creator'][0]);
    console.log('*******************');
    
    console.log(entry.pubDate[0]);
    console.log('*******************');
    
};


_.mapKeys(defaultConfigYaml.feed, (v, k) => {

    request(k, (e, res, body) => {
        
        if ( e ) {
            throw e;
        }

        //var hash = md5(body);
        //console.log("hash = ", hash);
        
        
        xml2js(body, (e, result) => {
            //console.log(result);
            //console.log(util.inspect(result, false, null));
            //console.log(result);
            if ( e ) {
                throw e; 
            }
            
            parseFeed(result);

        });
    });
});






