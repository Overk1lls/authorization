import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SERVER_URL = 'http://localhost:4000';

const auth = credentials => {
    return fetch(SERVER_URL + '/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(e => console.log('auth server fetch error: ' + e.message));
};

export default function Authorization({ setToken }) {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [phone, setPhone] = useState();
    const [date, setDate] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitHandler = async e => {
        e.preventDefault();

        if (name && surname && phone && date && email && password) {
            let user = await auth({ name, surname, phone, date, email, password });
            if (!user.error) setToken(user.token);
            else console.log(user.error);
        }
    };

    return (
        <form className="vh-100 gradient-custom" onSubmit={submitHandler}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Authorization</h2>
                                    <p className="text-white-50 mb-5">Please enter details about you</p>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            onChange={e => setName(e.target.value)}
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Surname"
                                            onChange={e => setSurname(e.target.value)}
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Phone number"
                                            onChange={e => setPhone(e.target.value)}
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            placeholder="Date"
                                            onChange={e => setDate(e.target.value)}
                                            type="date"
                                        />
                                    </div>
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
                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Enter</button>
                                    <Link to='/login'>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

Authorization.propTypes = {
    setToken: PropTypes.func.isRequired
};