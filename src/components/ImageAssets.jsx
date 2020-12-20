import * as React from 'react';
import HomeBgL from '../images/homepage/bg_l.png';
import HomeBgM from '../images/homepage/bg_m.png';
import HomeBgS from '../images/homepage/bg_s.png';

const mediaMap = {
	l: '(min-width: 1280px)',
	m: '(min-width: 500px)',
	s: '(min-width: 320px)',
};

const homeBgSrc = [
	{size: 'l', src: HomeBgL},
	{size: 'm', src: HomeBgM},
	{size: 's', src: HomeBgS},
];

const homeBgSrcStyle = {width: '100%', height: '100%', objectFit: 'contain'};
const getResponsivePicture = (items, style = {}) => {
	const defaultImgSrc = items.filter((item) => item.size === 'l')[0].src;

	return (
		<picture>
			{items &&
				items.map(({size, src}) => (
					<source media={mediaMap[size]} srcSet={src} key={size} />
				))}
			<img src={defaultImgSrc} alt="background image" style={style} />
		</picture>
	);
};

const HomeResponsiveBg = () => {
	return getResponsivePicture(homeBgSrc, homeBgSrcStyle);
};

export {HomeResponsiveBg};
