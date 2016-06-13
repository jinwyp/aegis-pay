var fs   = require("fs");
var path = require('path');

var PATH_SEPARATOR = path.normalize("/");

function isDirExistsSync (dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        } else {
            throw e;
        }
    }
}

function isFileExistsSync(filePath) {
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

function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code !== 'EEXIST' ) throw e;
    }
}


function mkdirpSync(pathStr) {
    var pathArray = path.normalize(pathStr).split(PATH_SEPARATOR);
    var resolvedPath = pathArray[0];

    pathArray.forEach(function (name) {
        if (!name || name.substr(-1, 1) === ":") return;
        resolvedPath += PATH_SEPARATOR + name;
        var stat;

        try {
            stat = fs.statSync(resolvedPath);
        } catch (e) {
            if (e.code === 'ENOENT') {
                fs.mkdirSync(resolvedPath);
            }

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
        if (stat && stat.isFile()){
            throw new Error(pathStr + 'is a file')
        }
    });
}

module.exports = (function () {

    return {
        makeDir : mkdirpSync,

        isDirExistsSync : isDirExistsSync,

        isFileExistsSync : isFileExistsSync
    }
})();
