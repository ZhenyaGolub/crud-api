import { IncomingMessage, ServerResponse } from 'http';

export const deleteUser = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {};
