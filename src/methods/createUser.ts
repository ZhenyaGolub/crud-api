import { IncomingMessage, ServerResponse } from 'http';

import { parseBody } from '../utils/helpers.js';
import { validateUser } from '../utils/validate.js';
import { User } from '../types/user.js';

export const createUser = async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
    const body = (await parseBody(req)) as User;
    const isValidUser = validateUser(body);

    res.end();
};
