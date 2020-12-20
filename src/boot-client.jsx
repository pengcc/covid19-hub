import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {StateProvider} from './store/stateHelper';
import initialState from './store/initialState';
import reducer from './store/reducers';

ReactDOM.render(
	<StateProvider initialState={initialState} reducer={reducer}>
		<App />
	</StateProvider>,
	document.getElementById('digital-energy-app')
);
