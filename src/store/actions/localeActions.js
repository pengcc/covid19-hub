const updateLocale = (code) => {
	return {
		type: 'UPDATE_LOCALE',
		payload: code,
	};
};

export default {
	updateLocale,
};
