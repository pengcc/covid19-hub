import React from 'react';
import {Redirect} from 'react-router-dom';
import {useStateValue} from 'Store/stateHelper';
import ChartView from './ChartView';

import styles from './Home.module.scss';

const Home = () => {
	const [{user}] = useStateValue();
	const {isLoggedIn} = user;

	return (
		<div className={styles.pageHome}>
			{isLoggedIn ? <ChartView /> : <Redirect to="/login" />}
		</div>
	);
};

export default Home;
