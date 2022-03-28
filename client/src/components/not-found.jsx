import { Link } from "react-router-dom";
import { baseUrl } from "../App";

export default function NotFound() {
    return (
        <header>
            <div className="text-center">
                <h1>
                    {window.location.pathname} page is not found! (404)
                    <br />
                    :(
                </h1>
                <Link to={baseUrl}>
                    <button
                        className="btn btn-outline-dark mt-3 px-5"
                        type="button"
                    >
                        Back
                    </button>
                </Link>
            </div>
        </header>
    )
}