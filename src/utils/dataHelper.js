export const getTransformedRunningData = (arr) => {
	let result = {
		meter_unit: 'kWh',
		power_unit: 'W',
		date: '',
		meterStatues: [],
		powerStatues: [],
	};

	[...arr].reverse().forEach(({created, body} = {}) => {
		const [date, timestamp] = created.split(' ');
		if (date !== result.date) {
			result.date = date;
		}
		const [meter_180, , power_l0] = body;
		const powerStatus = {timestamp, power_l0, power_l1: power_l0};
		const meterStatus = {timestamp, meter_180, meter_181: meter_180};
		result.meterStatues.push(meterStatus);
		result.powerStatues.push(powerStatus);
	});

	return result;
};

const getTimeByMinuteStep = (dateStr, mins) =>
	new Date(new Date(dateStr).setMinutes(mins))
		.toString()
		.match(/(\d{2}:\d{2}):\d{2}/)[1];

export const getTransformedPowerDayStatus = (dateStr, dataArr) => {
	const placeholder = '_';
	const newDateStr = new Date(dateStr).setHours(0);
	const startMinute = 0;
	let data = dataArr.flatMap((item) =>
		item.length === 0
			? Array.from(Array(10)).fill(placeholder).flat()
			: item.flat()
	);

	let powerData = data.map((val, index) => {
		let minutes = startMinute + index;
		let timestamp = getTimeByMinuteStep(newDateStr, minutes);
		if (val !== placeholder) {
			return {timestamp, power_l0: val, power_l1: val};
		} else {
			return {timestamp};
		}
	});
	return {powerData};
};

export function getTransformedPowerDailyData(dateStr, dataArrList) {
	const placeholder = '_';
	const newDateStr = new Date(dateStr).setHours(0);
	const startMinute = 0;
	const flatDataArr = (dataArr) =>
		dataArr.flatMap((item) =>
			item.length === 0
				? Array.from(Array(10)).fill(placeholder).flat()
				: item.flat()
		);
	let resultData = [];
	dataArrList
		.map(({data, meter}) => ({dataArr: flatDataArr(data), meter}))
		.forEach(({dataArr, meter}) => {
			dataArr.forEach((val, idx) => {
				let item = null;
				let minutes = startMinute + idx;
				let timestamp = getTimeByMinuteStep(newDateStr, minutes);
				item =
					val !== placeholder
						? {timestamp, [meter]: val}
						: {timestamp};
				resultData[idx] =
					resultData[idx] !== undefined
						? {...resultData[idx], ...item}
						: item;
			});
		});

	return resultData;
}

export function getTransformedConsumptionData(dataArrList) {
	let resultData = [];
	dataArrList.forEach(({data, meter}) => {
		data.forEach(({created, used}, idx) => {
			const item = {timestamp: created.split(' ')[0], [meter]: used};
			resultData[idx] =
				resultData[idx] !== undefined
					? {...resultData[idx], ...item}
					: item;
		});
	});
	return resultData;
}

export function getChartApiPayload(dateStr, {meterList, path, token}) {
	return meterList.map(({id}) => ({
		path,
		payload: {bindId: id, token, date: dateStr.replace(/-/g, '')},
	}));
}
