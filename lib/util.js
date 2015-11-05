let path = require('path');


let packageRoot = ()  => path.join(__dirname, '..');



module.exports = {
    packageRoot: packageRoot()
};
