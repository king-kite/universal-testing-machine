/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { Button } from 'antd';

function ResultDetail() {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const data = {
		name: 'Aluminium',
		type: 'Compression',
		length: '22mm',
	};
	const info = React.useMemo(
		() =>
			data
				? [
						{
							title: 'Name of Material',
							value: data.name,
						},
						{
							title: 'Test Type',
							value: data.type,
						},
						{
							title: 'Length of Material',
							value: data.length,
						},
				  ]
				: [],
		[data]
	);

	const cards = [
		{
			title: 'Maximum force before material failure',
			value: '250N',
		},
		{
			title: 'Maximum time before material failure',
			value: '100s',
		},
		{
			title: 'Extension',
			value: '100mm',
		},
	];
	return (
		<div className="">
			<h2 className="font-medium text-lg text-secondary-500 md:text-xl">Test Details:</h2>
			<div className="mt-2 border-t border-gray-100">
				<dl className="divide-y divide-gray-10 md:grid md:grid-cols-2 lg:grid-cols-3">
					{info.map((detail, index) => (
						<div key={index} className="px-2 py-3">
							<dt className="text-sm font-medium leading-6 text-gray-900 md:text-base md:font-semibold">
								{detail.title}
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base md:font-medium">
								{detail.value}
							</dd>
						</div>
					))}
				</dl>
			</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{cards.map((card, index) => (
					<div
						className="bg-gray-200 border-2 border-solid border-gray-300 p-4 rounded-lg md:p-5 lg:p-6"
						key={index}
					>
						<h6 className="text-sm font-medium text-secondary-500">{card.title}:</h6>
						<h1 className="text-lg mt-2 font-medium text-primary-500">{card.value}</h1>
					</div>
				))}
			</div>
			<div className="mt-6 flex items-center justify-end gap-x-6">
				<Button
					// disabled={loading}
					// loading={loading}
					name="submit"
					htmlType="submit"
					size="large"
					type="primary"
				>
					<span className="px-2 text-gray-100 text-sm md:px-4 md:text-base">Save Test Result</span>
				</Button>
			</div>
		</div>
	);
}

export default ResultDetail;
