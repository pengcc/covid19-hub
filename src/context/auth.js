import React, {createContext, useContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children, value}) => (
	<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);

export function useAuth() {
	return useContext(AuthContext);
}
