var fs = require("fs"),
    pth = require('path');

fs.existsSync = fs.existsSync || path.existsSync;

module.exports = (function() {

    var PATH_SEPARATOR = pth.normalize("/");

    function mkdirSync(/*String*/path) {
        var resolvedPath = path.split(PATH_SEPARATOR)[0];
        path.split(PATH_SEPARATOR).forEach(function(name) {
            if (!name || name.substr(-1,1) == ":") return;
            resolvedPath += PATH_SEPARATOR + name;
            var stat;
            try {
                stat = fs.statSync(resolvedPath);
            } catch (e) {
                fs.mkdirSync(resolvedPath);

                // var fd;
                // try {
                //     fd = fs.openSync(resolvedPath, 'w', 438); // 0666
                // } catch(e) {
                //     fs.chmodSync(resolvedPath, 438);
                //     fd = fs.openSync(resolvedPath, 'w', 438);
                // }
                // if (fd) {
                //     fs.closeSync(fd);
                // }
            }
            if (stat && stat.isFile())
                throw new Error(path + 'is a file')
        });
    }

    return {
        makeDir : function(/*String*/path) {
            mkdirSync(path);
        }
    }
})();
