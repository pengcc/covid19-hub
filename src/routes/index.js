import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../components/Pages/Home';
import About from '../components/Pages/About';
import NoMatch from '../components/Pages/NoMatch';
import Login from '../components/Pages/Login';
import Signup from '../components/Pages/SignUp';
import ForgotPassword from '../components/Pages/ForgotPassword';
import ResetPassword from '../components/Pages/ResetPassword';
import UserAccount from '../components/Pages/UserAccount';
import UserVerification from '../components/Pages/UserVerification';
import Business from '../components/Pages/Business';
import Service from '../components/Pages/Service';
import ChartView from '../components/Pages/ChartView';

export const navLinkList = [
	{path: '/', msg_key: 'nav_my'},
	{path: '/business', msg_key: 'nav_business'},
	{path: '/shop', msg_key: 'nav_shop'},
	{path: '/service', msg_key: 'nav_service'},
	{path: '/about', msg_key: 'nav_about'},
];

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/business">
				<Business />
			</Route>
			<Route
				path="/shop"
				component={() => {
					window.location.href = 'https://diinno.tech';
					return null;
				}}
			/>
			<Route path="/service">
				<Service />
			</Route>
			<Route path="/chart">
				<ChartView />
			</Route>
			<Route path="/account">
				<UserAccount />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/verification">
				<UserVerification />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/resetpassword">
				<ResetPassword />
			</Route>
			<Route path="/forgotpassword">
				<ForgotPassword />
			</Route>
			<Route path="/about">
				<About />
			</Route>
			<Route component={NoMatch} />
		</Switch>
	);
};

export default Routes;
