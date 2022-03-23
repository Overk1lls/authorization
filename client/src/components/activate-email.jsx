import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAPI, msgToJSX } from '../lib/utils';
import { errors, SERVER_URL } from './authorization';

export const ActivateEmail = () => {
    const { code } = useParams();
    const [response, setResponse] = useState(<></>);

    useEffect(() => {
        setResponse(msgToJSX('info', 'The email is being activated...'));

        const activatingData = fetchAPI({
            url: `${SERVER_URL}/api/activate-email`,
            method: 'POST',
            body: { code }
        });

        setResponse(msgToJSX(
            activatingData && !activatingData.error ?
                ('info', 'The email is activated, thank you!') :
                'danger', !activatingData ? errors.SERVER : activatingData.error
        ));
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