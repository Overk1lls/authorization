import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAPI, isThereData, msgToJSX } from '../lib/utils';
import { errors, SERVER_URL } from './authorization';

export const ResetPassword = () => {
    const [pwdData, setPwdData] = useState({});
    const [response, setResponse] = useState(<></>);
    const { code } = useParams();

    const submitHandler = async event => {
        event.preventDefault();

        const { pwd, newPwd, cNewPwd } = pwdData;

        if (!pwd || !newPwd || !cNewPwd)
            return setResponse(msgToJSX({ message: errors.NO_DATA }));
        else if (pwd === newPwd)
            return setResponse(msgToJSX({ message: 'Passwords are the same!' }));

        fetchAPI({
            url: `${SERVER_URL}/api/reset-password`,
            method: 'POST',
            token: localStorage.getItem('token'),
            body: { resetCode: code, password: newPwd }
        }).then(data => {
            if (!isThereData(data))
                setResponse(msgToJSX({ message: !data ? errors.SERVER : data.error }));
            else setResponse(msgToJSX({ type: 'info', message: data.response }));
        });
    };

    const setData = (record, value) => setPwdData({ ...pwdData, [record]: value });

    return (
        <form>
            {response}
            <h3 className='text-center'>Reset Password</h3>
            <div className="form-group mb-2">
                <label htmlFor="inputOldPwd">Old Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputOldPwd"
                    placeholder="Old password"
                    onChange={e => setData('pwd', e.target.value)}
                />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputPassword">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="New password"
                    onChange={e => setData('newPwd', e.target.value)}
                />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputNewPassword">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputNewPassword"
                    placeholder="Confirm the new password"
                    onChange={e => setData('cNewPwd', e.target.value)}
                />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-outline-dark btn-lg px-5"
                    style={{ marginRight: '5px' }}
                    onClick={submitHandler}
                >
                    Enter
                </button>
                <Link to='/'>
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