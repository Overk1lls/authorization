import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const handleBack = () => {
        localStorage.removeItem('token');
    };

    return (
        <div className="justify-content-center align-items-center h-100">
            <Link to={'/'}>
                <button className="btn btn-outline-dark btn-lg px-5" type="submit" onClick={handleBack}>
                    Logout
                </button>
            </Link>
            <h1 className="justify-content-center align-items-center">Main Page</h1>
        </div>
    );
}