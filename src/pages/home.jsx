/* eslint-disable no-mixed-spaces-and-tabs */
import { ExclamationCircleOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Result, Skeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../components/history-table';
import routes from '../config/routes';

const data = [
	{
		sn: 1,
		date: '2023-08-24',
		name: 'aluminium',
		type: 'compression',
		length: '100',
		force: '50',
		extension: '150',
		time: '20s',
	},
];

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
			<h2 className="font-bold my-3 text-primary-500">History</h2>

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
				) : data && data.length > 0 ? (
					<Table data={data} />
				) : (
					<Result
						icon={
							<span className="text-primary-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
								<ExclamationCircleOutlined />
							</span>
						}
						title="There is currently no test history."
						extra={
							<Link className="w-full" to={routes.TEST_PAGE}>
								<Button
									icon={
										<span className="mr-2 text-sm md:text-base">
											<PlusOutlined />
										</span>
									}
									size="large"
									type="primary"
								>
									<span className="text-sm md:text-base">Conduct a test now</span>
								</Button>
							</Link>
						}
					/>
				)}
			</div>
		</div>
	);
}

export default Page;
