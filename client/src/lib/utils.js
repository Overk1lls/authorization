export const fetchAPI = async ({
    url,
    method = 'GET',
    token = '',
    headers = {
        'Content-Type': 'application/json'
    },
    body
}) => fetch(url, {
    method,
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
})
    .then(data => data.json())
    .catch(err => console.error(err));

export const msgToJSX = ({ message, type }) => {
    const className = `alert alert-${type ? type : 'danger'}`;
    return <div className={className}>{message}</div>;
};

export const isThereData = data => data ? (data.error ? false : true) : false;