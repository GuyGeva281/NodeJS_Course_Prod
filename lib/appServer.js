const http = require('http');
const url = require('url');
const { handleApiRequest } = require('./apiHandler');
const { serveStaticFile } = require('./staticFileHandler');
const { handleChatHandler } = require('./chatHandler');

function startServer(customPort = 3006) {
    const PORT = process.env.PORT || customPort;

    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = req.method;
        console.log(`Request ${pathname} with ${method}`);
        if (pathname.startsWith('/api/v1')) {
            handleApiRequest( req, res);
        } else {
            console.log("handle as file");
            serveStaticFile(req, res);
        }
    });

    handleChatHandler(server);

    server.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

module.exports = { startServer };