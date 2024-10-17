export const getLastEndpoint = (endpoint: string) => {
    const parts = endpoint.split('/');
    return parts[parts.length - 1];
};
