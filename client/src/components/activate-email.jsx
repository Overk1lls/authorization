import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../App';
import { fetchAPI, isThereData, msgToJSX } from '../lib/utils';
import { errors } from './authorization';

export default function ActivateEmail () {
    const { code } = useParams();
    const [response, setResponse] = useState(<></>);

    useEffect(() => {
        setResponse(msgToJSX({
            type: 'info',
            message: 'The email is being activated...'
        }));

        fetchAPI({ url: `${process.env.REACT_APP_API}/activate-email/${code}` })
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
            <Link to={`${baseUrl}/`}>
                <button className="btn btn-outline-dark btn-lg px-5" type="submit">
                    Back
                </button>
            </Link>
        </div>
    );
}