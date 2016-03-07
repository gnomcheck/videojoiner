var ffmpeg = require('D:/Coding/vj/node_modules/fluent-ffmpeg/index.js');

/*
 replicates this sequence of commands:

 ffmpeg -i title.mp4 -qscale:v 1 intermediate1.mpg
 ffmpeg -i source.mp4 -qscale:v 1 intermediate2.mpg
 ffmpeg -i concat:"intermediate1.mpg|intermediate2.mpg" -c copy intermediate_all.mpg
 ffmpeg -i intermediate_all.mpg -qscale:v 2 output.mp4

 Create temporary .mpg files for each video and deletes them after merge is completed.
 These files are created by filename pattern like [videoFilename.ext].temp.mpg [outputFilename.ext].temp.merged.mp4
 */

var firstFile = "D:/Coding/vj/video/janapecrime_1456846889266.mp4";
var secondFile = "D:/Coding/vj/video/janapecrime_1456846906838.mp4";
var thirdFile = "D:/Coding/vj/video/janapecrime_1456846924437.mp4";
var outPath = "D:/Coding/vj/video/out.mp4";

var proc = ffmpeg(firstFile)
    .input(secondFile)
    .input(thirdFile)
    //.input(fourthFile)
    //.input(...)
    .on('end', function() {
        console.log('files have been merged succesfully');
    })
    .on('error', function(err) {
        console.log('an error happened: ' + err.message);
    })
    .mergeToFile(outPath);