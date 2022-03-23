import { useState } from 'react';

export const useToken = () => {
    const getToken = () => localStorage.getItem('token');

    const [token, setToken] = useState(getToken());

    const saveToken = token => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    return {
        token,
        setToken: saveToken
    };
};