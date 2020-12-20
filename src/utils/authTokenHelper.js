const EXPIRATION = 20 * 60 * 1000 - 1000;

export const isLocalTokenValid = (timeStamp) => {
	if (!timeStamp) return false;

	return new Date().getTime() - Number(timeStamp) < EXPIRATION;
};
