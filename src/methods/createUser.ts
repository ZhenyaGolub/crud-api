import { IncomingMessage, ServerResponse } from 'http';

export const createUser = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {};
