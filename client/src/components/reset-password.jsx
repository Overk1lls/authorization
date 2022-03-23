import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAPI, msgToJSX } from '../lib/utils';
import { errors, SERVER_URL } from './authorization';

export const ResetPassword = () => {
    const [password, setPassword] = useState();
    const [confirmedPassword, setConfirmedPassword] = useState();
    const [response, setResponse] = useState('');
    const { resetCode } = useParams();

    const submitHandler = async event => {
        event.preventDefault();

        if (!password || !confirmedPassword || password === confirmedPassword) {
            return setResponse(msgToJSX(
                'danger',
                password === confirmedPassword ?
                    'Passwords are the same!' :
                    errors.NO_DATA
            ));
        }
        const resetPwdData = await fetchAPI({
            url: `${SERVER_URL}/api/reset-password`,
            method: 'POST',
            body: { resetCode, password }
        });

        setResponse(msgToJSX(resetPwdData && !resetPwdData.error ?
            ('info', resetPwdData.response) :
            'danger', !resetPwdData ? errors.SERVER : resetPwdData.error
        ));
    };

    return (
        <form>
            {response}
            <h3>Reset Password</h3>
            <div className="form-group mb-2">
                <label htmlFor="inputPassword">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputNewPassword">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputNewPassword"
                    placeholder="Confirm It"
                    onChange={e => setConfirmedPassword(e.target.value)}
                />
            </div>
            <div className="text-center">
                <Link to='/login'>
                    <button
                        type="submit"
                        className="btn btn-outline-dark btn-lg px-5"
                        style={{ marginRight: '5px' }}
                        onClick={submitHandler}
                    >
                        Enter
                    </button>
                </Link>
                <Link to='/auth'>
                    <button
                        className="btn btn-outline-dark btn-lg px-5"
                        type="submit"
                    >
                        Back
                    </button>
                </Link>
            </div>
        </form>
    );
};