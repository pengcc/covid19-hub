import userReducer from './userReducer';
import localeReducer from './localeReducer';

export default ({user, locale}, action) => ({
	user: userReducer(user, action),
	locale: localeReducer(locale, action),
});
