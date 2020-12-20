import {
	DataServiceInstance,
	//UserServiceInstance
} from './ApiService';

import qs from 'qs';

export const applyPostService = (path, data) => {
	return DataServiceInstance.post(path, qs.stringify(data));
};

export const getUserRunningData = ({token, device, size} = {}) => {
	const path = '/watt/latest';
	return applyPostService(path, {token, device, size});
};

export const getPowerDataByDate = ({token, bindId, date} = {}) => {
	const path = '/watt/power';
	return applyPostService(path, {token, bindId, date});
};

export const getElectricityConsumptionByMonth = ({
	token,
	bindId,
	date,
} = {}) => {
	const path = '/watt/total';
	return applyPostService(path, {token, bindId, date});
};

export const addDevice = ({token, number, password = 'xyz'} = {}) => {
	const path = '/device/create';
	return applyPostService(path, {token, number, password});
};

export const deleteDevice = ({token, number} = {}) => {
	const path = '/device/delete';
	return applyPostService(path, {token, number});
};

export const getDeviceList = ({token} = {}) => {
	const path = '/device/list';
	return applyPostService(path, {token});
};

export const userLogin = ({username, password} = {}) => {
	const path = '/user/login';
	return applyPostService(path, {username, password});
};

export const refreshToken = ({token} = {}) => {
	const path = '/user/expire';
	return applyPostService(path, {token});
};

export const userRegister = (data) => {
	const path = '/user/create';
	return DataServiceInstance.post(path, qs.stringify(data));
};

export const verifyUser = ({username, token} = {}) => {
	const path = '/user/verify';
	return applyPostService(path, {username, token});
};

export const applyNewPassword = ({username} = {}) => {
	const path = '/user/forgot';
	return applyPostService(path, {username});
};

export const resetPassword = ({username, token, password} = {}) => {
	const path = '/user/update';
	return applyPostService(path, {username, token, password});
};
