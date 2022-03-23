export const fetchAPI = async ({
    url,
    method = 'GET',
    headers = {
        'Content-Type': 'application/json'
    },
    body
}) => fetch(url, { method, headers, body: JSON.stringify(body) })
    .then(data => data.json())
    .catch(err => console.error(err));

export const msgToJSX = (type, message) => {
    const className = `alert alert-${type}`;
    return <div className={className}>{message}</div>;
};