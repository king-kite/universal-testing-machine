/* eslint-disable no-mixed-spaces-and-tabs */
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { Input, Select } from '../components/controls';
import routes from '../config/routes';

function Page() {
	const [form, setForm] = React.useState({});

	const [errors, setErrors] = React.useState({});

	const [loading, setLoading] = React.useState(false);

	const [open, setOpen] = React.useState(false);

	const handleChange = React.useCallback((name, value) => {
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
		setErrors((prevState) => ({
			...prevState,
			[name]: undefined,
		}));
	}, []);

	const handleSubmit = React.useCallback(
		(e) => {
			e.preventDefault();
			// clear the errors
			setErrors({});

			if (!form.name) {
				setErrors((prevState) => ({
					...prevState,
					name: 'Name of material is required.',
				}));
			} else if (!form.type) {
				setErrors((prevState) => ({
					...prevState,
					type: 'Test type is required.',
				}));
			} else if (!form.length) {
				setErrors((prevState) => ({
					...prevState,
					length: 'Length of material is required.',
				}));
			} else {
				setLoading(true);
				setOpen(true);
				setTimeout(() => {
					setLoading(false);
				}, 3000);
			}
		},
		[form]
	);

	return (
		<>
			<h2 className="font-bold my-3 text-primary-500">New Test</h2>
			<p className="text-secondary-500 my-2 text-base">
				Fill in the required information and then proceed to begin testing your materials.
			</p>

			<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
				<div>
					<Input
						label="Name of Material"
						error={errors.name}
						id="name"
						name="name"
						disabled={loading}
						onChange={(e) => handleChange('name', e.target.value)}
						placeholder="Enter the name of material"
						value={form.name}
					/>
				</div>
				<div className="">
					<Select
						id="type"
						disabled={loading}
						label="Test Type"
						name="type"
						placeholder="Select Test Type"
						error={errors.type}
						onSelect={(value) => handleChange('type', value)}
						options={[
							{
								value: 'compression',
								label: 'Compression',
							},
							{
								value: 'tension',
								label: 'Tension',
							},
							{
								value: 'torsion',
								label: 'Torsion',
							},
						]}
						value={form.type}
					/>
				</div>
				<div>
					<Input
						label="Length of Material (in mm)"
						error={errors.length}
						id="length"
						name="length"
						disabled={loading}
						type="number"
						onChange={(e) => handleChange('length', e.target.value)}
						placeholder="Length of Material (in mm)"
						value={form.length}
					/>
				</div>
				<div className="mt-6 flex items-center gap-x-6">
					<Link to={routes.HOME_PAGE}>
						<Button disabled={loading} size="large" htmlType="button" type="default">
							<span className="px-2 text-gray-700 text-sm md:px-2 md:text-base">Go Back</span>
						</Button>
					</Link>
					<Button
						disabled={loading}
						loading={loading}
						name="submit"
						htmlType="submit"
						size="large"
						type="primary"
					>
						<span className="px-2 text-gray-100 text-sm md:px-4 md:text-base">Start Test</span>
					</Button>
				</div>
			</form>
			<Modal
				onCancel={() => setOpen(false)}
				title={loading ? 'Test In Progress' : 'Test Completed'}
				open={open}
				maskClosable={false}
				footer={null}
				centered
			>
				<div className="min-h-[40vh] p-4 w-full">
					{loading ? (
						<div className="flex flex-col items-center justify-center ">
							<div className="py-3">
								<Spin spinning size="large" />
							</div>
							<p className="font-medium animate-pulse text-sm my-3 text-secondary-500 text-center">
								Test in Progress...
							</p>
						</div>
					) : (
						<div className="flex flex-col items-center">
							<span className="text-green-600 text-6xl">
								<CheckCircleOutlined className="text-green-600" />
							</span>
							<p className="font-medium text-sm my-3 text-secondary-500 text-center">
								Test Completed
							</p>
							<Link className="my-3" to={routes.RESULT_PAGE}>
								<Button size="large" htmlType="button" type="primary">
									<span className="px-2 text-gray-100 text-sm md:px-2 md:text-base">
										View Result
									</span>
								</Button>
							</Link>
						</div>
					)}
				</div>
			</Modal>
		</>
	);
}

export default Page;
