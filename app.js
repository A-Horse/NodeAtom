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

require('./server.js')(7788);

// TODO 自定义 yaml
let defaultConfigYaml =
    yaml.safeLoad(
      fs.readFileSync(
        path.resolve(
          myUtil.packageRoot, 'config.yaml')));

db.init(path.join(process.env.HOME, defaultConfigYaml.config.db));

var argv = require('optimist').argv;

if (argv.emacs) {
  global.emacs = true;
}

if (argv.notifier) {
  global.notifier = true;
  require('./lib//show').notifierStart();
}

if (argv.clean) {
  db.deleteAllEntry(function(res){
    if ( res ) {
      console.log('clean successful!');
      process.exit();
    }
  });
}

let queryFeed = () => {
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
      if (!feedHash[k]) {
        feedHash = hash;
      } else if (feedHash[k] === hash) {
        return;
      }

      try {
        xml2js(body, (e, result) => {
          if (e) {
            throw e;
          }
          require('./lib/parse').parse(result, v); //v = [tags]
        });
      } catch(error) {
        
      }
    });
  });
};


if ( !argv.clean ) {
  queryFeed();
  let mainProcess = setInterval(function(){
    queryFeed();
  }, defaultConfigYaml.config.interval);
  //require('./server')(defaultConfigYaml.config.serverPort);
}
