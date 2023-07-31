import {Navigate, useLocation} from 'react-router-dom';

const PrivateRoute = ({children}: { children: JSX.Element }) => {
    let location = useLocation();

    const token = localStorage.getItem('token');
    // if (!token || token.length === 0) {
    //     return <Navigate to="/auth/login" state={{ from: location }} />;
    // }
    return children;
};

export default PrivateRoute;
