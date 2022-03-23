import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { msgToJSX, fetchAPI } from '../lib/utils';
import { errors, SERVER_URL } from './authorization';

export const Login = ({ setToken }) => {
    const [credentials, setCredentials] = useState({});
    const [response, setResponse] = useState(<></>);

    const preHandlerActions = event => {
        event.preventDefault();
        setResponse(<></>);
    };

    const submitHandler = async event => {
        preHandlerActions(event);

        if (!credentials.email || !credentials.password)
            return setResponse(msgToJSX('danger', errors.NO_DATA));

        const loginData = await fetchAPI({
            url: `${SERVER_URL}/api/login`,
            method: 'POST',
            body: credentials
        });

        loginData && !loginData.error ?
            setToken(loginData.token) :
            isThereData(loginData);
    };

    const resetPasswordHandler = async event => {
        preHandlerActions(event);

        const email = credentials.email;

        if (!email)
            return setResponse(msgToJSX('danger', errors.NO_DATA));

        const resetPwdData = await fetchAPI({
            url: `${SERVER_URL}/reset-password`,
            method: 'POST',
            body: JSON.stringify({ email })
        });

        resetPwdData && !resetPwdData.error ?
            setResponse(msgToJSX('info', resetPwdData.response)) :
            isThereData(resetPwdData);
    };

    const setData = (record, value) =>
        setCredentials({ ...credentials, [record]: value });

    const isThereData = data =>
        setResponse(msgToJSX('danger', !data ? errors.SERVER : data.error));

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
                <Link to='/auth'>
                    <button
                        className="btn btn-outline-dark btn-lg px-5"
                        type="submit"
                    >
                        Register
                    </button>
                </Link>
                <Link to='#'>
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
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};