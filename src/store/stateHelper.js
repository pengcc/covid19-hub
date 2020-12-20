import React, {createContext, useContext} from 'react';
import createPersistedReducer from './persistance';

const usePersistedReducer = createPersistedReducer(
	'state',
	globalThis.sessionStorage
);

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
	<StateContext.Provider value={usePersistedReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
