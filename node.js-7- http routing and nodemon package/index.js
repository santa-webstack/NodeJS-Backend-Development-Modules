const http = require('http');
const fs = require('fs');
const PORT = 4000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {

    const handleFile = (fileName, statusCode) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("File Not Found");
            } else {
                res.writeHead(statusCode, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            }
        });
    };

    if (req.url === '/' || req.url === '/home') {
        handleFile("index.html", 200);
    } else if (req.url === '/about') {
        handleFile("about.html", 200);
    } else if (req.url === '/contact') {
        handleFile("contact.html", 200);
    } else {
        handleFile("error.html", 404);
    }
});

server.listen(PORT, hostname, () => {
    console.log(`server is running at http://${hostname}:${PORT}`);
});