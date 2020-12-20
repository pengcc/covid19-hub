import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {getMessages, getValidLocale} from 'Intl/index';
import Header from './Elements/Header';
import Routes from 'Routes/index';
import {useStateValue} from 'Store/stateHelper';

import styles from './App.module.scss';

const App = () => {
	const [{locale}] = useStateValue();
	const currentLocale = getValidLocale(locale.code);
	let messages = getMessages(currentLocale);

	return (
		<IntlProvider locale={currentLocale} messages={messages}>
			<Router>
				<Header />
				<div className={styles.main}>
					<Routes />
				</div>
			</Router>
		</IntlProvider>
	);
};

export default App;
