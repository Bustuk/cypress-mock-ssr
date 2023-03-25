import connect from 'connect';
import nock from 'nock';
import { MockRequest } from '../typings/mockReq';

export const cypressMockMiddleware = () => {
  const middleware = connect();

  middleware.use(
    '/__cypress_server_mock',
    (req, res) => {
      const chunks: any = [];

      req.on('data', (chunk) => {
        chunks.push(chunk);
      });

      req.on('end', () => {
        const reqBody = JSON.parse(Buffer.concat(chunks).toString());

        const { hostname, method, path, statusCode, body } = reqBody as MockRequest;
        const lcMethod = method.toLowerCase() as Lowercase<MockRequest['method']>;
        nock(hostname)[lcMethod](path).reply(statusCode, body);
      });
      res.statusCode = 200;
      res.end();
    },
  );

  middleware.use(
    '/__cypress_clear_mocks',
    (req, res) => {
      nock.restore();
      nock.cleanAll();
      nock.activate();
      res.statusCode = 200;
      res.end();
    },
  );

  return middleware;
};
