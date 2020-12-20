export const convertObjToArray = (obj, name = 'type') =>
	Object.keys(obj).map((key) => ({[name]: key, ...obj[key]}));
