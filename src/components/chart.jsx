/* eslint-disable react/prop-types */
import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

import useInterval from '../hooks/useInterval';

// const names = [];

// for (let i = 0; i <= 120; i++) {
// 	names.push(i);
// }

// const data = names.map((name) => {
// 	// Generate a random number between 0 (inclusive) and 1 (exclusive)
// 	const randomFraction = Math.random();

// 	// Scale the random number to be between 0 and 1000
// 	const value = Math.floor(randomFraction * 1000);

// 	return {
// 		value,
// 		name,
// 	};
// });

const CustomizedAxisTick = (props) => {
	const { x, y, payload } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
				{payload.value}
			</text>
		</g>
	);
};

// const tickInterval = 2; // Adjust this value to control the spacing between ticks

const Chart = ({ force, start, title }) => {
	const [forces, setForces] = React.useState([]);

	const [time, setTime] = React.useState(0);

	const updateForces = React.useCallback(() => {
		const currentTime = time + 1;
		setTime(currentTime);
		setForces((prevState) => [...prevState, { value: force, time: currentTime }]);
	}, [force, time]);

	const { toggleInterval } = useInterval(updateForces, 1000, { status: 'pause' });

	React.useEffect(() => {
		if (start) {
			setTime(0);
			toggleInterval('play');
		} else {
			toggleInterval('pause');
		}
	}, [start, toggleInterval]);

	return (
		<div className="mb-4 w-100">
			{title && (
				<h3 className="capitalize my-2 text-gray-700 text-base md:my-3 md:text-lg lg:my-4">
					{title}
				</h3>
			)}
			<div className="w-100">
				<ResponsiveContainer width="100%" height={350}>
					<LineChart
						data={forces.map((force) => ({
							name: force.time,
							value: force.value,
						}))}
					>
						<CartesianGrid stroke="#ccc" vertical={false} />
						<XAxis dataKey="name" tick={<CustomizedAxisTick />} />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="value" stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default Chart;
