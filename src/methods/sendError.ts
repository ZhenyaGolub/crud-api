import { IncomingMessage, ServerResponse } from 'http';

export const sendError = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
    message: { title: string; message: string }
) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};
