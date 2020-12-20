export default (state = {code: 'de-DE'}, action) => {
	switch (action.type) {
		case 'UPDATE_LOCALE':
			return {
				...state,
				code: action.payload,
			};
		default:
			return state;
	}
};
