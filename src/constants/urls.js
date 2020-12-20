export const ROOT = '';

const _getUrl = (path) => `${ROOT}/${path}`;

export const URLS = {
	HOME: _getUrl(''),
	LOGIN: _getUrl('login'),
	SIGNUP: _getUrl('signup'),
	CHART: _getUrl('chart'),
	ABOUT: _getUrl('about'),
};
