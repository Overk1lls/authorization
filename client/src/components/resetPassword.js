import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SERVER_URL = 'http://localhost:4000';

const fetchAPI = credentials => {
    return fetch(SERVER_URL + '/api/resetPassword', {
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
        // <form className="vh-100 gradient-custom" onSubmit={submitHandler}>
        //     <div className="container py-5 h-100">
        //         <div className="row d-flex justify-content-center align-items-center h-100">
        //             <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        //                 {resetResponse ? <div className="alert alert-danger">{resetResponse}</div> : ''}
        //                 <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
        //                     <div className="card-body p-5 text-center">
        //                         <div className="mb-md-5 mt-md-4 pb-5">
        //                             <h2 className="fw-bold mb-2 text-uppercase">Reset Password</h2>
        //                             <p className="text-white-50 mb-5">Please enter your new password!</p>
        //                             <div className="form-outline form-white mb-4">
        //                                 <input
        //                                     className="form-control form-control-lg"
        //                                     placeholder="New Password"
        //                                     onChange={e => setPassword(e.target.value)}
        //                                     type="password"
        //                                 />
        //                             </div>
        //                             <div className="form-outline form-white mb-4">
        //                                 <input
        //                                     className="form-control form-control-lg"
        //                                     placeholder="New Password Again"
        //                                     onChange={e => setConfirmedPassword(e.target.value)}
        //                                     type="password"
        //                                 />
        //                             </div>
        //                             <div className="btn-group" role="group">
        //                                 <button className="btn btn-outline-light btn-lg px-5" type="submit">Enter</button>
        //                                 <Link to='/login'><button className="btn btn-outline-light btn-lg px-5">Login</button></Link>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </form>
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