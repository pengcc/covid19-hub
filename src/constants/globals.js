const DATA_API_URL_DEV = 'https://diinno.de/server/rest';
const DATA_API_URL_PROD = '/server/rest';
const isDevAPI = process.env.NODE_ENV === 'development';
export const DATA_API_URL = isDevAPI ? DATA_API_URL_DEV : DATA_API_URL_PROD;
//export const USER_API_URL = 'https://europe-west3-digital-energy-4e6c6.cloudfunctions.net/api';

export const LOCAL_PREFIX = 'DIINNO';

export const TOKEN_EXPIRATION = 20 * 60 * 1000 - 600;

export const POWER_API_INTERVAL = 10 * 60 * 1000 + 100;
