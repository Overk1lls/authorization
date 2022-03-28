import { useState } from 'react';
import { Link } from 'react-router-dom';
import { msgToJSX, fetchAPI, isThereData } from '../lib/utils';
import { baseUrl } from '../App';

export const errors = {
    NO_DATA: 'Please, fill the form',
    SERVER: 'Something went wrong...'
};

export default function Authorization() {
    const [userData, setUserData] = useState({});
    const [response, setResponse] = useState(<></>);

    const submitHandler = async event => {
        event.preventDefault();
        setResponse(<></>);

        let validated = true;
        Object.values(userData).forEach(value => {
            if (!value) return validated = false;
        });
        if (!validated) return setResponse(msgToJSX({ message: errors.NO_DATA }));

        const authData = await fetchAPI({
            url: `${process.env.REACT_APP_API}/auth`,
            method: 'POST',
            body: userData
        });

        setResponse(msgToJSX(
            isThereData(authData) ?
                { type: 'info', message: authData.response } :
                { message: !authData ? errors.SERVER : authData.error }
        ));
    };

    const setData = (record, value) =>
        setUserData({ ...userData, [record]: value });

    return (
        <form>
            {response}
            <div className="row mb-2">
                <div className="col">
                    <label htmlFor="inputName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder="Name"
                        onChange={e => setData('name', e.target.value)}
                    />
                </div>
                <div className="col mb-2">
                    <label htmlFor="inputSurname">Surname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputSurname"
                        placeholder="Surname"
                        onChange={e => setData('surname', e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col mb-2">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        onChange={e => setData('email', e.target.value)}
                        area-describedby='email-help'
                    />
                    <small
                        id='email-help'
                        className='form-text text-muted'
                    >
                        You'll get an activation link to your email
                    </small>
                </div>
                <div className="col mb-2">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                        onChange={e => setData('password', e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputPhone">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputPhone"
                    placeholder="+3808005553535"
                    onChange={e => setData('phone', e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="inputDate">Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    onChange={e => setData('date', e.target.value)}
                />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-outline-dark btn-lg px-5"
                    style={{ marginRight: '5px' }}
                    onClick={submitHandler}
                >
                    Sign Up
                </button>
                <Link to={baseUrl}>
                    <button
                        className="btn btn-outline-dark btn-lg px-5"
                        type="submit"
                    >
                        Login
                    </button>
                </Link>
            </div>
        </form>
    );
}