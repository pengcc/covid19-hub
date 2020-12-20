import {useState, useEffect, useRef, useMemo} from 'react';
import throttle from 'lodash/throttle';
import {applyPostService} from 'Http/Api';

export function useThrottle(cb, delay) {
	const cbRef = useRef(cb);
	// use mutable ref to make useCallback/throttle not depend on `cb` dep
	useEffect(() => {
		cbRef.current = cb;
	}, [cb]);
	// react-hooks/exhaustive-deps useCallback inline function rule disabled
	/* eslint-disable-next-line */
	return useMemo(
		() =>
			throttle((...args) => cbRef.current(...args), delay, {
				leading: true,
				trailing: false,
			}),
		[delay]
	);
}

export function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export function useToken(refreshTokenFunc, delay, token) {
	const savedCallback = useRef(refreshTokenFunc);
	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = refreshTokenFunc;
	}, [refreshTokenFunc]);

	// Set up the interval.
	useEffect(() => {
		let interId;
		const asyncRefreshToken = async (token) => {
			try {
				const result = await savedCallback.current({token});
				if (result.data.status === 'ERROR') {
					throw new Error(`${result.data.reason}`);
				}
				//dispatch(userActions.updateAuthTimestamp(new Date().getTime()));
			} catch (err) {
				if (interId) {
					clearInterval(interId);
				}
				console.error(err);
			}
		};

		function tick() {
			asyncRefreshToken(token);
		}

		if (delay !== null && token.length > 0) {
			interId = setInterval(tick, delay);
			return () => clearInterval(interId);
		}
	}, [delay, token]);
}

export function useFetchChartData(initialPayload) {
	const [responseData, setResponseData] = useState(null);
	const [payloadList, setPayloadList] = useState(initialPayload);
	const [isLoading, setIsLoading] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const results = await Promise.all(
					[...payloadList].map(({path, payload}) =>
						applyPostService(path, payload)
					)
				);
				const isAnyFailed =
					results.filter(({data}) => data.status === 'Error').length >
					0;
				setIsLoading(false);
				if (!isAnyFailed) {
					setResponseData(
						results.map(({data}) => {
							return data;
						})
					);
				} else {
					throw new Error('Api failed');
				}
			} catch (err) {
				setIsLoading(false);
				setIsFailed(true);
				setError(err);
				console.error({err});
			}
		}

		fetchData();
	}, [payloadList]);

	return [{responseData, isLoading, isFailed, error}, setPayloadList];
}
