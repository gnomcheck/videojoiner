var Youtube = require('youtube-api'),
    fs = require('fs'),
    ReadJson = require("r-json"),
    Lien = require("lien"),
    Opn = require("opn");

const CREDENTIALS = ReadJson("./client_id.json");
console.log(CREDENTIALS);

var server = new Lien({
    host: 'localhost',
    port: 5000
});

var oauth = Youtube.authenticate({
    type: "oauth"
    , client_id: CREDENTIALS.web.client_id
    , client_secret: CREDENTIALS.web.client_secret
    , redirect_url: CREDENTIALS.web.redirect_uris[0]
});

Opn(oauth.generateAuthUrl({
    access_type: "offline"
    , scope: ["https://www.googleapis.com/auth/youtube.upload"]
}));

server.page.add("/oauth2callback", function (lien) {
    console.log("Trying to get the token using the following code: " + lien.search.code);
    oauth.getToken(lien.search.code, function(err, tokens) {
        if (err) { lien(err, 400); return Logger.log(err); }
        oauth.setCredentials(tokens);
        Youtube.videos.insert({
            resource: {
                // Video title and description
                snippet: {
                    title: "Test Upload"
                    , description: "Test video upload via YouTube API"
                }
                // I don't want to spam my subscribers
                , status: {
                    privacyStatus: "private"
                }
            }
            // This is for the callback function
            , part: "snippet,status"

            // Create the readable stream to upload the video
            , media: {
                body: fs.createReadStream("./video/mergedVideo.mp4")
            }
        }, function (err, data) {
            if (err) { return lien.end(err, 400); }
            lien.end(data);
        });
    });
});