const http = require('http');
const fs = require("fs");

const PORT = 3000;

const handleReadFile = (fileName, statusCode, res) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end("File not found");
        } else {
            res.writeHead(statusCode, { "content-type": "text/html" });
            res.write(data);
            res.end();
        }
    });
};

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        handleReadFile("index.html", 200, res);
    } else if (req.url === "/about") {
        handleReadFile("about.html", 200, res);
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Page not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});