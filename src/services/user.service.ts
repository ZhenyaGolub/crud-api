import { IncomingMessage, ServerResponse } from 'http';
import { v4 } from 'uuid';
import { User } from '../types/user.js';
import { BaseService } from './base.service.js';
import { getEndpointData, parseBody } from '../utils/helpers.js';
import { validate } from 'uuid';
import { API_ENDPOINT } from '../utils/api.js';
import { validateUser } from '../utils/validate.js';

export class UserService extends BaseService {
    db: Array<{ id: string } & User> = [];

    constructor() {
        super();
    }

    getUsers(
        req: IncomingMessage,
        res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
    ) {
        const { last, partsAmount } = getEndpointData(req.url!);

        if (validate(last)) {
            const user = this.db.find(({ id }) => id === last);
            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(user));
                res.end();
                return;
            } else {
                this.sendError(req, res, {
                    title: 'Not found',
                    message: `There is no user with id: ${last}`
                });
                return;
            }
        }

        if (req.url === API_ENDPOINT) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(this.db));
            res.end();
            return;
        }
        const isInvalidId =
            !validate(last) && req.url !== API_ENDPOINT && partsAmount === 3;

        this.sendError(
            req,
            res,
            {
                title: isInvalidId ? 'Invalid' : 'Not found',
                message: isInvalidId
                    ? `Id: ${last} is invalid`
                    : 'There is no method for this HTTP method'
            },
            isInvalidId ? 400 : 404
        );
    }

    async createUser(
        req: IncomingMessage,
        res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
    ) {
        const body = (await parseBody(req)) as User;
        const isValidUser = validateUser(body);
        if (isValidUser) {
            const newUser = { id: v4(), ...body };
            this.db.push(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
            return;
        } else {
            this.sendError(
                req,
                res,
                {
                    title: 'Invalid',
                    message: `Request body is invalid`
                },
                400
            );
        }
    }
    async deleteUser(
        req: IncomingMessage,
        res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
    ) {
        const { last, partsAmount } = getEndpointData(req.url!);
        if (partsAmount === 3) {
            const isValidId = validate(last);

            if (isValidId) {
                const foundedUser = this.db.find(({ id }) => last === id);
                if (foundedUser) {
                    this.db = this.db.filter(({ id }) => id !== last);
                    res.statusCode = 204;
                    res.end();
                } else {
                    this.sendError(
                        req,
                        res,
                        {
                            title: 'Not found',
                            message: `There is no user with id: ${last}`
                        },
                        404
                    );
                }
            } else {
                this.sendError(
                    req,
                    res,
                    {
                        title: 'Invalid',
                        message: `Id: ${last} is invalid`
                    },
                    400
                );
            }
        } else {
            this.sendError(
                req,
                res,
                {
                    title: 'Not found',
                    message: 'There is no method for this HTTP method'
                },
                404
            );
        }
    }
    async updateUser(
        req: IncomingMessage,
        res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
    ) {
        const { last, partsAmount } = getEndpointData(req.url!);
        if (partsAmount === 3) {
            const body = (await parseBody(req)) as User;
            const isValidId = validate(last);
            const isValidBody = validateUser(body);

            if (isValidBody && isValidId) {
                const foundedUser = this.db.find(({ id }) => last === id);
                if (foundedUser) {
                    const updatedUser = { id: foundedUser.id, ...body };
                    this.db = [
                        ...this.db.filter(({ id }) => id !== last),
                        updatedUser
                    ];
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updatedUser));
                } else {
                    this.sendError(
                        req,
                        res,
                        {
                            title: 'Not found',
                            message: `There is no user with id: ${last}`
                        },
                        404
                    );
                }
            }
            if (!isValidId) {
                this.sendError(
                    req,
                    res,
                    {
                        title: 'Invalid',
                        message: `Id: ${last} is invalid`
                    },
                    400
                );
            }
        } else {
            this.sendError(
                req,
                res,
                {
                    title: 'Not found',
                    message: 'There is no method for this HTTP method'
                },
                404
            );
        }
    }
}

export const userService = new UserService();
