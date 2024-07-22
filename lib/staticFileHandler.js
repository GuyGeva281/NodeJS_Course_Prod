//1. import http module
const http = require('http');
const path = require('path');
const fs = require('fs');

const fileMap = {};
//2. create server
const serveStaticFile = ((request, response) => {
    //3. create default response
    //console.log("request ",request);
    //response.setHeader("Content-Type", "application/json");

    var reqUrl = request.url === "/" ? "index.html" : request.url;

    console.log("request file: "+ reqUrl);
    response.setHeader("Content-Type", getContentType(reqUrl));
    if (fileMap.hasOwnProperty(reqUrl)) {
        response.end(fileMap[reqUrl]);
    }
    var fPath = path.join(__dirname, "../public", reqUrl);
    if (fs.existsSync(fPath)) {
        fs.readFile(fPath, 'utf8', (err, data) => {
            if (err) {

            }
            else {
                fileMap[reqUrl] = data;
                response.end(data);
            }

        });
    }
    else {
        response.statusCode = 404;
        response.end("Not Found");
    }

    //let obj = {name:"guy", ts:new Date()};
    //response.write(JSON.stringify(obj));



});

function getContentType(url) {
    let ext = path.extname(url).toLowerCase();
    let res = "text/html";
    switch (ext) {
        case ".js":
            res = "text/javascript";
            break;
        case ".json":
            res = "application/json";
            break;
        case ".css":
            res = "text/css";
            break;
        case ".ico":
            res = "image/x-icon";
            break;
        case ".jpg":
            res = "image/jpg";
            break;
        case ".png":
            res = "image/png";
            break;
    }

    return res;
}
module.exports = { serveStaticFile };