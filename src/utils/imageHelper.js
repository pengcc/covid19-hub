const mediaMap = {
	l: '(min-width: 1280px)',
	m: '(min-width: 768px)',
	s: '(min-width: 320px)',
};

const getResponsivePicture = (imgSets) => {
	const defaultImgSrc = imgSets.filter((item) => item.size === 'l')[0].src;
	return (
		<picture>
			{imgSets &&
				[...imgSets].map(({size, src}) => (
					<source key={size} media={mediaMap[size]} srcSet={src} />
				))}
			<img
				width="100%"
				height="auto"
				src={defaultImgSrc}
				alt="background image"
			/>
		</picture>
	);
};

export {getResponsivePicture};
