import http from 'node:http';
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const str = `Received ${method} request for ${url}`;
  res.writeHead(200, { 'Content-Type': 'text/plain' }).end(str);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
