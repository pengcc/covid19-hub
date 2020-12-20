import React from 'react';
import {DatePicker} from 'antd';
import dayjs from 'dayjs';

import styles from './AntDatePicker.module.scss';

// const enableDates = ['2020-07-22', '2020-07-28'];
const disabledDate = (current) => {
	// Can not select days after today
	// const isEnabledDate =  enableDates.includes(dayjs(current).format('YYYY-MM-DD'));
	// return !isEnabledDate;

	return current && current > dayjs().endOf('day');
};
const AntDatePicker = (props = {}) => {
	return (
		<div className={styles.antDatePicker}>
			<DatePicker
				fullscreen={false}
				disabledDate={disabledDate}
				className={styles.picker}
				{...props}
			/>
		</div>
	);
};

export default AntDatePicker;
