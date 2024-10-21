import { User } from '../types/user.js';

export const validateUser = (fields: User) => {
    const rules = {
        username: (data: unknown) => typeof data === 'string' && data.trim(),
        age: (data: unknown) => data && typeof data === 'number',
        hobbies: (data: unknown) =>
            Array.isArray(data) &&
            data.every((item) => typeof item === 'string')
    };
    return Object.keys(rules).every((key) =>
        rules[key as keyof typeof rules](fields[key as keyof typeof fields])
    );
};
