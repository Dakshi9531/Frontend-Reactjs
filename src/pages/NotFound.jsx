import { Link } from 'react-router-dom';

function NotFound() {
return (
    <div className="page">
    <div className="not-found">
        <h1>404</h1>

        <h2>Page not found</h2>

        <p>
        The page you are looking for does not exist.
        </p>

        <Link to="/dashboard">
        Go to Dashboard
        </Link>
    </div>
    </div>
);
}

export default NotFound;