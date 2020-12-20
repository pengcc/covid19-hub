const initialState = {
	profile: null,
	deviceList: null,
	authTimestamp: '',
	token: '',
	isLoggedIn: false,
};
export default (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN': {
			const {profile, token, authTimestamp} = action.payload;

			return {
				...state,
				profile,
				token,
				authTimestamp,
				isLoggedIn: true,
			};
		}
		case 'SET_USER_PROFILE':
			return {
				...state,
				profile: action.payload,
			};
		case 'SET_DEVICES_LIST': {
			const deviceList = action.payload;
			const {device = [], bind = []} = deviceList;
			const deviceNumbers = device.map((item) => item.number);
			const validMeters = bind.filter(
				(item) => item.valid && deviceNumbers.includes(item.number)
			);

			return {
				...state,
				deviceList: {
					list: deviceList,
					devices: device,
					validMeters,
				},
			};
		}
		case 'UPDATE_AUTH_TIMESTAMP':
			return {
				...state,
				authTimestamp: action.payload,
			};
		case 'LOG_OUT':
			return initialState;

		default:
			return state;
	}
};
