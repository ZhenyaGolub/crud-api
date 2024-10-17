import { IncomingMessage, ServerResponse } from 'http';

export const sendError = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
    message: { title: string; message: string },
    statusCode: number = 404
) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};
