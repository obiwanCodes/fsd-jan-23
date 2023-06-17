const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/')
//         res.end('Welcome')
//     else if (req.url === "/home") res.end('<h1>Welcome to HTTP module</h1><p>lorem ipsum dolor sit</p>');
//     else res.end("<h1>Oops!</h1><p>We can't find the page you are looking for</p>")
// })

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === "/event") res.end("response generated from an event");
})

server.listen(4000);