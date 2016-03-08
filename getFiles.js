var fs = require('fs');

/*
Files from dir './video/' get read and pushed into 'files'
 */
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





