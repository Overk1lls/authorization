import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVER_URL = 'http://localhost:4000';

const auth = async credentials => {
    return fetch(SERVER_URL + '/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(e => console.log(e.message));
};

export default function Authorization() {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [phone, setPhone] = useState();
    const [date, setDate] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [response, setResponse] = useState('');

    const submitHandler = async e => {
        e.preventDefault();

        if (name && surname && phone && date && email && password) {
            let authResponse = await auth({ name, surname, phone, date, email, password });
            if (authResponse.error) console.log(authResponse.error);
            else setResponse(authResponse.response);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            {response ? <div className="alert alert-danger">{response}</div> : response}
            <div className="row mb-2">
                <div className="col">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder="Name" onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="col mb-2">
                    <label htmlFor="inputSurname">Surname</label>
                    <input type="text" className="form-control" id="inputSurname" placeholder="Surname" onChange={e => setSurname(e.target.value)}></input>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col mb-2">
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="col mb-2">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
                </div>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="inputPhone">Phone</label>
                <input type="text" className="form-control" id="inputPhone" placeholder="+3808005553535" onChange={e => setPhone(e.target.value)}></input>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="inputDate">Date</label>
                <input type="date" className="form-control" id="inputDate" onChange={e => setDate(e.target.value)}></input>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-outline-dark btn-lg px-5" style={{ marginRight: '5px' }}>Sign Up</button>
                <Link to='/login'><button className="btn btn-outline-dark btn-lg px-5" type="submit">Login</button></Link>
            </div>
        </form>
    );
}