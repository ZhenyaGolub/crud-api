import { IncomingMessage } from 'http';

export const getLastEndpoint = (endpoint: string) => {
    const parts = endpoint.split('/');
    return parts[parts.length - 1];
};

export const parseBody = (req: IncomingMessage) =>
    new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => resolve(JSON.parse(body)));
        } catch (error) {
            reject(error);
        }
    });
