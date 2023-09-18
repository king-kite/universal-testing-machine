/* eslint-disable react/prop-types */
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

const names = [];

for (let i = 0; i <= 120; i++) {
	names.push(i);
}

const data = names.map((name) => {
	// Generate a random number between 0 (inclusive) and 1 (exclusive)
	const randomFraction = Math.random();

	// Scale the random number to be between 0 and 1000
	const value = Math.floor(randomFraction * 1000);

	return {
		value,
		name,
	};
});

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

const App = () => {
	return (
		// <LineChart width={730} height={250} data={data}
		// 	margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
		// 	<CartesianGrid strokeDasharray="3 3" />
		// 	<XAxis dataKey="name" />
		// 	<YAxis />
		// 	<Tooltip />
		// 	<Legend />
		// 	<Line type="monotone" dataKey="pv" stroke="#8884d8" />
		// 	<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
		// </LineChart>
		<div className="w-100">
			<ResponsiveContainer width="100%" height={350}>
				<LineChart data={data}>
					<CartesianGrid stroke="#ccc" vertical={false} />
					<XAxis dataKey="name" tick={<CustomizedAxisTick />} />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="value" stroke="#8884d8" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default App;
