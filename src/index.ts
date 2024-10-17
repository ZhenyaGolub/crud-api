import http from 'http';

import 'dotenv/config';
import { API_ENDPOINT_REGULAR_EXPRESSION } from './utils/regularExpressions.js';
import { sendError } from './methods/sendError.js';

const HOST = 'localhost';
const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
    if (API_ENDPOINT_REGULAR_EXPRESSION.test(req.url!)) {
        switch (req.method) {
            case 'GET':
                break;
            case 'POST':
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
            default:
                sendError(req, res, {
                    title: 'Not found',
                    message: 'There is no method for this HTTP method'
                });
                break;
        }
        res.end();
    } else {
        sendError(req, res, {
            title: 'Not found',
            message: 'Endpoint not found'
        });
    }
});

server.listen(PORT, HOST, () =>
    console.log(`Server has been started on https://${HOST}:${PORT}`)
);
