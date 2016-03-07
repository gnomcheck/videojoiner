var fs = require('fs');

function getFiles(callback){
    var filesList = [];
    fs.readdir('./video', function(err, files) {
        if (err)
            throw err;
        files.forEach(function (file) {
            filesList.push("./video/" + file.toString());
        });
        filesList.sort();
        callback(filesList);
    });
    module.exports.filesList = filesList;
}

module.exports.getFiles = getFiles;





