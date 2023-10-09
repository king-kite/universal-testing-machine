import React from 'react';

function useInterval(callback, delay = 1000, options) {
	const savedCallback = React.useRef();
	const [interval, setUseInterval] = React.useState();
	const [status, setStatus] = React.useState(options?.status || 'play');

	const toggleInterval = React.useCallback((status) => {
		setStatus(status);
	}, []);

	const removeInterval = React.useCallback(() => {
		clearInterval(interval);
	}, [interval]);

	// Remember the latest callback.
	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	React.useEffect(() => {
		function tick() {
			if (savedCallback.current) savedCallback.current();
		}
		if (delay !== null && status === 'play') {
			const id = setInterval(tick, delay);
			setUseInterval(id);
			return () => clearInterval(id);
		}
	}, [delay, status]);

	return {
		removeInterval,
		status,
		toggleInterval,
	};
}

export default useInterval;
