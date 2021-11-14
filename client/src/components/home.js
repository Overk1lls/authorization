import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Home() {
    const history = useHistory();

    const handleBack = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        history.go(0);
    };

    return (
        <div className="text-center">
            <h3>You've successfully authorized!</h3>
            <Link to={'/'}><button className="btn btn-outline-dark mt-3 px-5" type="submit" onClick={handleBack}>Logout</button></Link>
        </div>
    );
}