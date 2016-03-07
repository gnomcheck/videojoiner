var fs = require('fs');

var filesList = [];

function getFiles(callback){
    fs.readdir('./video', function(err, files) {
        if (err)
            throw err;
        files.forEach(function (file) {
            filesList.push("./video/" + file.toString());
        });
        callback(filesList);

    });
};

module.exports.getFiles = getFiles;
module.exports.filesList = filesList;




