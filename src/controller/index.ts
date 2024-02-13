import http from 'node:http';
import { respondOk, respondWithError } from '../utils/response';
import { parseRequest } from './endpoints';

export function startServer(port: string) {
  http
    .createServer((request, response) => {
      let body = '';
      request
        .on('data', (chunk) => {
          body += chunk;
        })
        .on('end', () => {
          try {
            const operation = parseRequest(request, body);
            const result = operation();
            respondOk(response, result);
          } catch (error) {
            respondWithError(response, error);
          }
        });
    })
    .listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}
