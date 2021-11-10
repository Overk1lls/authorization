import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SERVER_URL = 'http://localhost:4000';

const activateEmail = async credentials => {
    return await fetch(SERVER_URL + '/api/auth/activateEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(e => console.log(e.message));
};

export default function ActivateEmail() {
    const { code } = useParams();

    useEffect(() => {
        let actResponse = activateEmail({ code });
        if (actResponse.error) console.log(actResponse.error);
    }, [code]);

    return (
        <div className="container">
            <div className="alert alert-danger">Email has been activated. Thank you!</div>
            <Link to='/login'><button className="btn btn-outline-dark btn-lg px-5" type="submit">Back</button></Link>
        </div>
    );
}