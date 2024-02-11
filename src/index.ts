import http from 'node:http';
import { handleRequest } from './controller';
const port = process.env.PORT;

http
  .createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      handleRequest({ req, res, body });
    });
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
