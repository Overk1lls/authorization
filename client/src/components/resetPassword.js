import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SERVER_URL = 'http://localhost:4000';

const fetchAPI = credentials => {
    return fetch(SERVER_URL + '/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(e => console.log(e.message));
};

export default function ResetPassword() {
    const [password, setPassword] = useState();
    const [confirmedPassword, setConfirmedPassword] = useState();
    const [response, setResponse] = useState('');
    let { resetCode } = useParams();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password && confirmedPassword && password === confirmedPassword) {
            let resetPass = await fetchAPI({ resetCode, password });
            if (resetPass.error) console.log(resetPass.error);
            if (resetPass.response) setResponse(resetPass.response);
        } else setResponse('Entered passwords are not the same!');
    };

    return (
        <form onSubmit={submitHandler}>
            {response ? <div className="alert alert-danger">{response}</div> : response}
            <h3>Reset Password</h3>
            <div className="form-group mb-2">
                <label htmlFor="inputPassword">New Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputNewPassword">Confirm Password</label>
                <input type="password" className="form-control" id="inputNewPassword" placeholder="Confirm It" onChange={e => setConfirmedPassword(e.target.value)} />
            </div>
            <div className="text-center">
                <Link to='/login'><button type="submit" className="btn btn-outline-dark btn-lg px-5" style={{ marginRight: '5px' }}>Enter</button></Link>
                <Link to='/auth'><button className="btn btn-outline-dark btn-lg px-5" type="submit">Back</button></Link>
            </div>
        </form>
    );
};