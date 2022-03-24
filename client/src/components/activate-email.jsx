import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAPI, isThereData, msgToJSX } from '../lib/utils';
import { errors, SERVER_URL } from './authorization';

export const ActivateEmail = () => {
    const { code } = useParams();
    const [response, setResponse] = useState(<></>);

    useEffect(() => {
        setResponse(msgToJSX({
            type: 'info',
            message: 'The email is being activated...'
        }));

        fetchAPI({ url: `${SERVER_URL}/api/activate-email/${code}` })
            .then(data =>
                setResponse(msgToJSX(
                    isThereData(data) ?
                        { type: 'info', message: 'The email is activated, thank you!' } :
                        { message: !data ? errors.SERVER : data.error }
                ))
            );
    }, [code]);

    return (
        <div className="text-center">
            {response}
            <Link to='/login'>
                <button className="btn btn-outline-dark btn-lg px-5" type="submit">
                    Back
                </button>
            </Link>
        </div>
    );
};