'use strict';

let yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

let util = require('./lib/util');

let defaultConfigYaml =
        yaml.safeLoad(
            fs.readFileSync(
                path.resolve(
                    util.packageRoot, 'config.yaml')));


console.log(defaultConfigYaml);
