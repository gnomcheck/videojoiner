var ffmpeg = require('./node_modules/fluent-ffmpeg/');
var getFile = require('./getFiles');

getFile.getFiles(function (list) {
    console.log(list);

    var mergedVideo = ffmpeg();

    list.forEach(function(videoName){
        mergedVideo = mergedVideo.addInput(videoName);
    });

    mergedVideo.mergeToFile('./video/mergedVideo.mp4')
        .on('error', function(err) {
            console.log('Error ' + err.message);
        })
        .on('end', function() {
            console.log('Finished!');
        });
});