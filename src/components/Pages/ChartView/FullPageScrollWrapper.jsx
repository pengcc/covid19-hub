import React, {useEffect} from 'react';
import DailyElectricityConsumption from './DailyElectricityConsumption';
import allActions from 'Store/actions';
import {getDeviceList} from 'Http/Api';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import antdLocaleDe from 'antd/es/date-picker/locale/de_DE';
import {useStateValue} from 'Store/stateHelper';

const {userActions} = allActions;
const localeMap = {
	'de-DE': 'de',
	'en-US': 'en',
};

export default () => {
	const [{user, locale}, dispatch] = useStateValue();
	const localeCode = locale.code;
	const dayjsLocale = localeMap[localeCode];
	dayjs.locale(dayjsLocale);
	const pickerLocale = localeCode === 'de-DE' ? antdLocaleDe : 'default';
	const {token, deviceList} = user;
	const today = dayjs();
	const dateFormatStr = today.format('YYYY-MM-DD');
	const {validMeters = []} = deviceList || {};

	return <ChartsContainer></ChartsContainer>;
};
