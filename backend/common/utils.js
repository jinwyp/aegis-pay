var fs  = require("fs"),
    path = require('path');


module.exports = (function () {

    var PATH_SEPARATOR = path.normalize("/");

    function mkdirSync(/*String*/pathStr) {

        var resolvedPath = pathStr.split(PATH_SEPARATOR)[0];

        pathStr.split(PATH_SEPARATOR).forEach(function (name) {

            if (!name || name.substr(-1, 1) == ":") return;
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
                throw new Error(pathStr + 'is a file')
        });
    }

    return {
        makeDir : function (/*String*/pathStr) {
            mkdirSync(pathStr);
        },

        isDirExistsSync : function (dirPath) {
            try {
                return fs.statSync(dirPath).isDirectory();
            } catch (e) {
                if (e.code === 'ENOENT') {
                    return false;
                } else {
                    throw e;
                }
            }
        },

        isFileExistsSync : function (filePath) {
            try {
                return fs.statSync(filePath).isFile();
            } catch (e) {
                if (e.code === 'ENOENT') {
                    return false;
                } else {
                    throw e;
                }
            }
        }

    }
})();
