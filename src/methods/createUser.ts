import { IncomingMessage, ServerResponse } from 'http';

import { parseBody } from '../utils/helpers.js';

export const createUser = async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
    const body = await parseBody(req);

    res.end();
};
