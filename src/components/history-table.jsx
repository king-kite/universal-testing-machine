/* eslint-disable react/prop-types */

import React from 'react';

import { Select } from './controls';
import Table from './table';
import { GlobalFilter } from './table/components';

const columns = [
	{
		Header: 'S/N',
		accessor: 'sn',
	},
	{
		Header: 'Date',
		accessor: 'date',
	},
	{
		Header: 'Material Name',
		accessor: 'name',
	},
	{
		Header: 'Test Type',
		accessor: 'type',
	},
	{
		Header: 'Length(mm)',
		accessor: 'length',
	},
	{
		Header: 'Max Force Required(N)',
		accessor: 'force',
	},
	{
		Header: 'Extension(mm)',
		accessor: 'extension',
	},
	{
		Header: 'Time Taken(s)',
		accessor: 'time',
	},
];

function HistoryTable({
	data: tests = [],
	typeFilter: typeFilterSearch = true,
	search = true,
	...props
}) {
	const [filter, setFilter] = React.useState('');
	const [typeFilter, setTypeFilter] = React.useState('');

	const data = React.useMemo(
		() =>
			tests.map((test, index) => {
				const force = test.forces.reduce(
					(acc, force) => (force.value > acc ? force.value : acc),
					0
				);
				const time = test.forces.reduce((acc, force) => (force.time > acc ? force.time : acc), 0);
				return {
					...test,
					sn: index + 1,
					force,
					time,
				};
			}),
		[tests]
	);

	const filteredData = React.useMemo(() => {
		if (!filter && !typeFilter) return data;
		let tests = data;
		if (filter) {
			tests = tests.filter((test) => {
				const search = filter.trim().toLowerCase();
				if (test.name.toLowerCase().includes(search)) return true;
				if (test.type.toLowerCase().includes(search)) return true;
				return false;
			});
		}

		if (typeFilter) {
			tests = tests.filter((test) => {
				const filter = typeFilter.trim().toLowerCase();
				if (test.type.trim().toLowerCase() === filter) return true;
				return false;
			});
		}

		return tests;
	}, [data, typeFilter, filter]);

	return (
		<>
			{/* Filters Start */}
			{(search || typeFilter) && (
				<div className="gap-6 grid mb-6 py-2 items-center sm:grid-cols-2 md:grid-cols-4">
					{search && (
						<GlobalFilter
							label={
								<>
									Search for tests{' '}
									<small className="font-light text-secondary-300">
										(by material name or test type)
									</small>
								</>
							}
							count={filteredData.length}
							filter={filter}
							setFilter={setFilter}
						/>
					)}
					{typeFilterSearch && (
						<div className="w-full md:col-span-1">
							<Select
								allowClear
								onClear={() => setTypeFilter(undefined)}
								label="Filter by Type"
								value={typeFilter || undefined}
								placeholder="Select Type"
								onSelect={(value) => {
									setTypeFilter(value);
								}}
								options={[
									{
										label: 'Compression',
										value: 'compression',
									},
									{
										label: 'Tension',
										value: 'tension',
									},
									{
										label: 'Torsion',
										value: 'torsion',
									},
								]}
								id="test"
								name="test"
							/>
						</div>
					)}
				</div>
			)}
			{/* Filters Stop */}
			<Table columns={columns} data={filteredData} {...props} />
		</>
	);
}

export default HistoryTable;
