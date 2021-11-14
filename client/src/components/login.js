import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FETCH_URL = 'http://localhost:4000/api/login';

const loginAPI = (credentials, url) => {
    return fetch(FETCH_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(e => console.log(e.message));
};

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [response, setResponse] = useState('');

    const submitHandler = async e => {
        e.preventDefault();

        if (email && password) {
            let response = await loginAPI({ email, password }, '');
            if (response.error) console.log(response);
            else if (response.response) setResponse(response.response);
            else setToken(response.token);
        }
    };

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        if (email) {
            let resetPass = await loginAPI({ email }, '/resetPassword');
            if (resetPass.error) console.log(resetPass.error);
            if (resetPass.response) setResponse(resetPass.response);
        } else setResponse('Please, provide an email');
    };

    return (
        <form onSubmit={submitHandler}>
            {response ? <div className="alert alert-danger">{response}</div> : response}
            <h3>Login</h3>
            <div className="form-group mb-2">
                <label htmlFor="inputEmail">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-outline-dark btn-lg px-5" style={{ marginRight: '5px' }}>Sign In</button>
                <Link to='/auth'><button className="btn btn-outline-dark btn-lg px-5" type="submit">Register</button></Link>
                <Link to='#'><p className="mt-3" onClick={resetPasswordHandler}><strong>Forgot Password?</strong></p></Link>
            </div>
        </form>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};