import http from 'http';

import 'dotenv/config';
import { API_ENDPOINT_REGULAR_EXPRESSION } from './utils/regularExpressions.js';
import { sendError } from './methods/sendError.js';
import { getUsers } from './methods/getUsers.js';
import { createUser } from './methods/createUser.js';
import { updateUser } from './methods/updateUser.js';
import { deleteUser } from './methods/deleteUser.js';

const HOST = 'localhost';
const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
    if (API_ENDPOINT_REGULAR_EXPRESSION.test(req.url!)) {
        switch (req.method) {
            case 'GET':
                getUsers(req, res);
                break;
            case 'POST':
                createUser(req, res);
                break;
            case 'PUT':
                updateUser(req, res);
                break;
            case 'DELETE':
                deleteUser(req, res);
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
