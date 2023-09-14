/* eslint-disable no-mixed-spaces-and-tabs */
import { PlusOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Skeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../config/routes';

function Page() {
	// const [data] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	return (
		<div>
			<h2 className="font-bold my-3 text-primary-500">Test Result</h2>

			<div className="py-2 sm:flex sm:items-center">
				<div className="my-2 w-full sm:mr-2 sm:my-0 sm:w-1/2 md:w-1/3 lg:w-1/4">
					<Link className="block w-full" to={routes.TEST_PAGE}>
						<Button
							block
							icon={
								<span className="mr-2 text-gray-700 text-sm md:text-base">
									<PlusOutlined />
								</span>
							}
							size="large"
						>
							<span className="text-sm text-gray-700 md:text-base">New Test</span>
						</Button>
					</Link>
				</div>
				<div className="my-2 w-full sm:ml-2 sm:my-0 sm:w-1/2 md:ml-4 md:w-1/3 lg:w-1/4">
					<Button
						block
						// disabled={isFetching}
						// loading={isFetching}
						// onClick={refetch}
						icon={
							<span className="mr-2 text-gray-700 text-sm md:text-base">
								<UndoOutlined />
							</span>
						}
						size="large"
					>
						<span className="text-sm text-gray-700 md:text-base">Refresh</span>
					</Button>
				</div>
			</div>

			<div className="my-2 py-4">
				{isLoading ? (
					<div className="py-2">
						<Skeleton active />
					</div>
				) : (
					<Result />
				)}
			</div>
		</div>
	);
}

function Result() {
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

export default Page;
