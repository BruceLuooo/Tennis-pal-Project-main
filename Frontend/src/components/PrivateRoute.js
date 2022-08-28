import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import appContext from '../context/appContext';
import { toast } from 'react-toastify';

function PrivateRoute() {
	const { token } = useContext(appContext);

	if (token) {
		return <Outlet />;
	} else {
		return <Navigate to='/sign-in' />;
	}
}

export default PrivateRoute;
