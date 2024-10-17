import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { USERS_DB } from '../database/database.js';
import { getLastEndpoint } from '../utils/helpers.js';
import { API_ENDPOINT } from '../utils/api.js';
import { sendError } from './sendError.js';

export const getUsers = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
    const userId = getLastEndpoint(req.url!);

    if (validate(userId)) {
        const user = USERS_DB.find(({ id }) => id === userId);
        if (!user) {
            sendError(req, res, {
                title: 'Not found',
                message: `There is no user with id: ${userId}`
            });
            return;
        }
    }

    if (req.url === API_ENDPOINT) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(USERS_DB));
        res.end();
    }

    if (!validate(userId) && req.url !== API_ENDPOINT) {
        sendError(
            req,
            res,
            {
                title: 'Invalid',
                message: `Id: ${userId} is invalid`
            },
            400
        );
        return;
    }
};
