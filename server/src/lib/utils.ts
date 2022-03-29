export const generateId = () => Math.random().toString(36).substring(2, 9);

export const getNodeEnv = () =>
    (process.env.NODE_ENV === 'development' ? 'development' : 'production');
