import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../context/auth';

function PrivateRoute({component: Component, ...rest}) {
	const {currentToken} = useAuth();

	return (
		<Route
			{...rest}
			render={(props) =>
				currentToken ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
}

export default PrivateRoute;
