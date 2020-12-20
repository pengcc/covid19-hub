const logIn = (data) => {
	return {
		type: 'LOG_IN',
		payload: data,
	};
};

const setUser = (userObj) => {
	return {
		type: 'SET_USER',
		payload: userObj,
	};
};

const setDevicesList = (data) => {
	return {
		type: 'SET_DEVICES_LIST',
		payload: data,
	};
};

const updateAuthTimestamp = (data) => {
	return {
		type: 'UPDATE_AUTH_TIMESTAMP',
		payload: data,
	};
};

const logOut = () => {
	return {
		type: 'LOG_OUT',
	};
};

export default {
	logIn,
	setUser,
	logOut,
	setDevicesList,
	updateAuthTimestamp,
};
