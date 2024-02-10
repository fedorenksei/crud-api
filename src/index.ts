import { handle } from './controller';
import http from 'node:http';
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  handle(req, res);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
