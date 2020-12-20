import de_DE from './de_DE';
import en_US from './en_US';

const MessagesListMap = {
	'de-DE': de_DE,
	'en-US': en_US,
};

export const validLocales = Object.keys(MessagesListMap);

const defaultLocale = 'de-DE';

const _isValidLocale = (locale) => validLocales.includes(locale);

export const getValidLocale = (locale) =>
	_isValidLocale(locale) ? locale : defaultLocale;

export const getMessages = (locale) => MessagesListMap[getValidLocale(locale)];

export default MessagesListMap;
