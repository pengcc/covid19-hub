import React, {useState, useEffect, Children} from 'react';
import {useThrottle} from 'Utils/eventHooks';

import styles from './ChartsContainer.module.scss';

const ChartsContainer = ({children}) => {
	const pageTotals = Children.count(children);
	const [pageIndex, setPageIndex] = useState(0);

	const [deltaY, setDeltaY] = useState(0);

	function updatePageIndex() {
		if (deltaY === 0) return;
		setPageIndex((index) => index + (1 * deltaY > 0 ? 1 : -1));
	}

	const throttledUpdatePageIndex = useThrottle(updatePageIndex, 100);

	useEffect(throttledUpdatePageIndex, [deltaY, throttledUpdatePageIndex]);

	const handleWheelEvent = (e) => {
		const {deltaY} = e;
		if (
			(pageIndex === 0 && deltaY < 0) ||
			(pageIndex === pageTotals - 1 && deltaY > 0) ||
			typeof deltaY !== 'number'
		) {
			return;
		}
		setDeltaY(deltaY);
	};

	return (
		<div
			className={styles.chartsContainer}
			style={{top: `${pageIndex * -100}%`}}
			onWheel={handleWheelEvent}>
			{children}
		</div>
	);
};

export default ChartsContainer;
