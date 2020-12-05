const http = require('http');

const server = http.createServer((req, res) => {
    // http://localhost:3000/
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    // http://localhost:3000/api/courses
    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
})


// const server = http.createServer();

// server.on('connection', (socket) => 
// {
//     console.log('New Connection');
// })

server.listen(3000);
console.log('Listening on port 3000...')