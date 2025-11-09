const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  let path = "./docs/";

  if (req.url === "/" || req.url === "/home") {
    path += "index.html";
    res.statusCode = 200;
  }
  else if (req.url === "/index") {
    res.setHeader('Location', '/home');
    res.statusCode = 301;
    res.end();
    return;
  }
  else if (req.url === "/aboutus") {
    path += "about.html";
    res.statusCode = 200;
  } else {
    path += "Notfound.html";
    res.statusCode = 404;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Internal Server Error');
      return;
    }

    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});