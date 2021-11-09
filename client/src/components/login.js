import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FETCH_URL = 'http://localhost:4000/api/login';

const fetchAPI = (credentials, url) => {
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
            let user = await fetchAPI({ email, password }, '');
            if (!user.error) setToken(user.token);
        }
    };

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        if (email) {
            let resetPass = await fetchAPI({ email }, '/resetPassword');
            if (resetPass.error) console.log(resetPass.error);
            if (resetPass.response) setResponse(resetPass.response);
        }
    };

    return (
        <form className="vh-100 gradient-custom" onSubmit={submitHandler}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                       {response ? <div className="alert alert-danger">{response}</div> : ''}
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your email and password!</p>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            onChange={e => setPassword(e.target.value)}
                                            type="password"
                                        />
                                    </div>
                                    <div className="btn-group" role="group">
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                            Enter
                                        </button>
                                        <Link to='/auth'>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                                Register
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                                <button className="btn btn-outline-light" onClick={resetPasswordHandler}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};