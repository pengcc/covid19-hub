import axios from 'axios';
import {DATA_API_URL} from 'Constants/globals';

const singleton = Symbol();
const singletonEnforcer = Symbol();

// function readCookie(name) {
//     const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
//     return (match ? decodeURIComponent(match[3]) : null);
// }

class DataApiService {
	constructor(enforcer) {
		if (enforcer !== singletonEnforcer) {
			throw new Error('Cannot construct singleton');
		}

		this.session = axios.create({
			baseURL: DATA_API_URL,
			timeout: 10000,
			// withCredentials: false, // allowed to carry cookies
			headers: {
				'Cache-Control': 'no-cache',
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				//'X-CSRFToken': readCookie('csrftoken')
			},
		});
	}

	static get instance() {
		// Try to get an efficient singleton
		if (!this[singleton]) {
			this[singleton] = new DataApiService(singletonEnforcer);
		}

		return this[singleton];
	}

	get = (...params) => this.session.get(...params);
	post = (...params) => this.session.post(...params);
	put = (...params) => this.session.put(...params);
	patch = (...params) => this.session.patch(...params);
	remove = (...params) => this.session.delete(...params);
}

const DataServiceInstance = DataApiService.instance;

export {DataServiceInstance};
