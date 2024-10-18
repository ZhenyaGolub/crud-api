import { User } from '../types/user.js';

export const validateUser = (fields: User) => {
    const rules = {
        username: (data: unknown) => typeof data === 'string' && data.trim(),
        age: (data: unknown) => data && typeof data === 'number',
        hobbies: (data: unknown) =>
            Array.isArray(data) &&
            data.every((item) => typeof item === 'string')
    };
    return Object.entries(fields).every(([key, value]) =>
        rules[key as keyof typeof rules](value)
    );
};
