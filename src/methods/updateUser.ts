import { IncomingMessage, ServerResponse } from 'http';

export const updateUser = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {};
