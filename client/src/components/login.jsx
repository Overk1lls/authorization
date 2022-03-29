import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../App';
import { msgToJSX, fetchAPI, isThereData } from '../lib/utils';
import { errors } from './authorization';

export default function Login({ setToken }) {
    const [credentials, setCredentials] = useState({});
    const [response, setResponse] = useState(<></>);
    const API_URL = `${process.env.REACT_APP_API}/login`;

    const submitHandler = async event => {
        event.preventDefault();
        setResponse(<></>);

        if (!credentials.email || !credentials.password)
            return setResponse(msgToJSX({ message: errors.NO_DATA }));

        fetchAPI({
            url: API_URL,
            method: 'POST',
            body: credentials
        }).then(data =>
            isThereData(data) ?
                setToken(data.token) :
                setResponse(msgToJSX({ message: !data ? errors.SERVER : data.error })));
    };

    const resetPasswordHandler = async () => {
        setResponse(<></>);

        const email = credentials.email;

        if (!email)
            return setResponse(msgToJSX({ message: 'Please, fill your email' }));

        fetchAPI({
            url: `${API_URL}/reset-password`,
            method: 'POST',
            body: { email }
        }).then(data => {
            if (!isThereData(data))
                setResponse(msgToJSX({ message: !data ? errors.SERVER : data.error }));
            else setResponse(msgToJSX({ type: 'info', message: data.response }));
        });
    };

    const setData = (record, value) => setCredentials({ ...credentials, [record]: value });

    return (
        <form>
            {response}
            <h3 className='text-center'>Login</h3>
            <div className="form-group mb-2">
                <label htmlFor="inputEmail">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="Email"
                    onChange={e => setData('email', e.target.value)}
                />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputPassword">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    onChange={e => setData('password', e.target.value)}
                />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-outline-dark btn-lg px-5"
                    style={{ marginRight: '5px' }}
                    onClick={submitHandler}
                >
                    Sign In
                </button>
                <Link to={`${baseUrl}auth`}>
                    <button
                        className="btn btn-outline-dark btn-lg px-5"
                        type="submit"
                    >
                        Register
                    </button>
                </Link>
                <Link to={'#'}>
                    <p
                        className="mt-3"
                        onClick={resetPasswordHandler}
                    >
                        <strong>Forgot Password?</strong>
                    </p>
                </Link>
            </div>
        </form>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};