export const copyStringToClipboard = (str) => {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

export const splitCamelCaseStr = (str) =>
	str.replace(/([^A-Z])([A-Z])/g, '$1 $2');

export const getCleanAmount = (amount) =>
	Number.isNaN(Number(amount)) ? '-' : amount;

export const strCapitalize = (s) => {
	if (typeof s !== 'string') return '';
	return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
};
