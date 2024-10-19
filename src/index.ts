import http from 'http';

import 'dotenv/config';
import { API_ENDPOINT_REGULAR_EXPRESSION } from './utils/regularExpressions.js';
import { userService } from './services/user.service.js';

const HOST = 'localhost';
const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
    if (API_ENDPOINT_REGULAR_EXPRESSION.test(req.url!)) {
        switch (req.method) {
            case 'GET':
                userService.getUsers(req, res);
                break;
            case 'POST':
                userService.createUser(req, res);
                break;
            case 'PUT':
                userService.updateUser(req, res);
                break;
            case 'DELETE':
                userService.deleteUser(req, res);
                break;
            default:
                userService.sendError(req, res, {
                    title: 'Not found',
                    message: 'There is no method for this HTTP method'
                });
                break;
        }
    } else {
        userService.sendError(req, res, {
            title: 'Not found',
            message: 'Endpoint not found'
        });
    }
});

server.listen(PORT, HOST, () =>
    console.log(`Server has been started on https://${HOST}:${PORT}`)
);
