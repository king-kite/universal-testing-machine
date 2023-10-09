/* eslint-disable no-mixed-spaces-and-tabs */
import { RetweetOutlined, ToTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import React from 'react';

import ResultChart from '../components/chart';
// import ResultDetail from '../components/result-detail';
import { getData, setData } from '../firebase/database';

const activeColor = 'bg-primary-700 text-gray-100';
const inactiveColor = 'bg-white text-primary-700 hover:bg-gray-100';

const COMPRESSION = 1;
const TENSILE = 2;
const TORSION = 3;

const keys = {
	clampDistance: 'clamp1Distance', // Distance Value
	// clampMotion: 'clampMotion', // Moves the clamp in speicified direction
	compressiveForce: 'compressiveForce', // -> Value for Compressive Testing
	tensileForce: 'tensileForce', // -> Value for Tensile Testing
	testStatus: 'testStatus', // System State i.e. ON/OFF or Start/Stop, 1 -> Start/ON 2 -> Stop/OFF
	testType: 'testType', // 1 -> Compressive, 2 -> Tensile, 3 -> Torsional
	torsionalForce: 'torsionalForce', // -> Value for Torsional Testing
};

function Page() {
	const [compressiveForce, setCompressiveForce] = React.useState(0);
	const [torsionalForce, setTorsionalForce] = React.useState(0);
	const [tensileForce, setTensileForce] = React.useState(0);

	// const [clampMotion, setClampMotion] = React.useState(0);
	const [clampDistance, setClampDistance] = React.useState(0);

	const [testStatus, setTestStatus] = React.useState(0);
	const [testType, setTestType] = React.useState(0);

	React.useEffect(() => {
		getData('', {
			onSuccess: (data) => {
				setCompressiveForce(data[keys.compressiveForce] ? +data[keys.compressiveForce] : 0);
				setTensileForce(data[keys.tensileForce] ? +data[keys.tensileForce] : 0);
				setTorsionalForce(data[keys.torsionalForce] ? +data[keys.torsionalForce] : 0);
				setClampDistance(data[keys.clampDistance] ? +data[keys.clampDistance] : 0);
				setTestStatus(data[keys.testStatus] ? +data[keys.testStatus] : 0);
				setTestType(data[keys.testType] ? +data[keys.testType] : 0);
			},
			onError: (error) => {
				window.alert('Error :' + error.message);
			},
		});
	}, []);

	return (
		<div>
			<h2 className="font-bold my-3 text-primary-500">Test</h2>

			<div className="my-2 py-2 grid grid-cols-1 gap-4 w-full sm:grid-cols-2 lg:grid-cols-3">
				<div className="w-full">
					<span
						onClick={() => {
							setData('/' + keys.testType, testType === COMPRESSION ? 0 : COMPRESSION, {
								onError(error) {
									window.alert('Error: ' + error.message);
								},
							});
						}}
						className={`${
							+testType === COMPRESSION ? activeColor : inactiveColor
						} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<VerticalAlignBottomOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Compression</h3>
				</div>
				<div className="w-full">
					<span
						onClick={() => {
							setData('/' + keys.testType, testType === TENSILE ? 0 : TENSILE, {
								onError(error) {
									window.alert('Error: ' + error.message);
								},
							});
						}}
						className={`${
							+testType === TENSILE ? activeColor : inactiveColor
						} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md rotate-180 transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<ToTopOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Tension</h3>
				</div>
				<div className="w-full">
					<span
						onClick={() => {
							setData('/' + keys.testType, testType === TORSION ? 0 : TORSION, {
								onError(error) {
									window.alert('Error: ' + error.message);
								},
							});
						}}
						className={`${
							+testType === TORSION ? activeColor : inactiveColor
						} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<RetweetOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Torsion</h3>
				</div>
			</div>

			<div className="my-2 py-2 grid grid-cols-1 gap-4 w-full md:gap-5 md:grid-cols-2 lg:gap-6 lg:grid-cols-3">
				<div className="bg-white border-2 border-solid border-gray-300 p-4 rounded-lg shadow-lg md:p-5 lg:p-6 w-full">
					<h6 className="text-sm font-medium text-secondary-500 md:text-base">System State</h6>
					<h1
						className={`${
							+testStatus === 1 ? 'text-green-500' : 'text-red-500'
						} text-xl mt-2 font-black sm:text-2xl md:text-3xl`}
					>
						{+testStatus === 1 ? 'ON' : 'OFF'}
					</h1>
				</div>
				<div className="bg-white border-2 border-solid border-gray-300 p-4 rounded-lg shadow-lg md:p-5 lg:p-6 w-full">
					<h6 className="text-sm font-medium text-secondary-500 md:text-base">Distance</h6>
					<h1 className="text-xl mt-2 font-black text-primary-700 sm:text-2xl md:text-3xl">
						{clampDistance}mm
					</h1>
				</div>
				<div className="bg-white border-2 border-solid border-gray-300 p-4 rounded-lg shadow-lg md:p-5 lg:p-6 w-full">
					<h6 className="text-sm font-medium text-secondary-500 md:text-base">Extension</h6>
					<h1 className="text-xl mt-2 font-black text-primary-700 sm:text-2xl md:text-3xl">0mm</h1>
				</div>
			</div>

			<div className="my-2 py-4">
				<ResultChart
					title="compression"
					force={compressiveForce}
					start={+testType === COMPRESSION && +testStatus === 1}
				/>
				<ResultChart
					title="torsion"
					force={torsionalForce}
					start={+testType === TORSION && +testStatus === 1}
				/>
				<ResultChart
					title="tension"
					force={tensileForce}
					start={+testType === TENSILE && +testStatus === 1}
				/>
				{/* <ResultDetail /> */}
			</div>
		</div>
	);
}

export default Page;

// /* eslint-disable no-mixed-spaces-and-tabs */
// import { CheckCircleOutlined } from '@ant-design/icons';
// import { Button, Modal, Spin } from 'antd';
// import React from 'react';
// import { Link } from 'react-router-dom';

// import { Input, Select } from '../components/controls';
// import routes from '../config/routes';

// function Page() {
// 	const [form, setForm] = React.useState({});

// 	const [errors, setErrors] = React.useState({});

// 	const [loading, setLoading] = React.useState(false);

// 	const [open, setOpen] = React.useState(false);

// 	const handleChange = React.useCallback((name, value) => {
// 		setForm((prevState) => ({
// 			...prevState,
// 			[name]: value,
// 		}));
// 		setErrors((prevState) => ({
// 			...prevState,
// 			[name]: undefined,
// 		}));
// 	}, []);

// 	const handleSubmit = React.useCallback(
// 		(e) => {
// 			e.preventDefault();
// 			// clear the errors
// 			setErrors({});

// 			if (!form.name) {
// 				setErrors((prevState) => ({
// 					...prevState,
// 					name: 'Name of material is required.',
// 				}));
// 			} else if (!form.type) {
// 				setErrors((prevState) => ({
// 					...prevState,
// 					type: 'Test type is required.',
// 				}));
// 			} else if (!form.length) {
// 				setErrors((prevState) => ({
// 					...prevState,
// 					length: 'Length of material is required.',
// 				}));
// 			} else {
// 				setLoading(true);
// 				setOpen(true);
// 				setTimeout(() => {
// 					setLoading(false);
// 				}, 3000);
// 			}
// 		},
// 		[form]
// 	);

// 	return (
// 		<>
// 			<h2 className="font-bold my-3 text-primary-500">New Test</h2>
// 			<p className="text-secondary-500 my-2 text-base">
// 				Fill in the required information and then proceed to begin testing your materials.
// 			</p>

// 			<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
// 				<div>
// 					<Input
// 						label="Name of Material"
// 						error={errors.name}
// 						id="name"
// 						name="name"
// 						disabled={loading}
// 						onChange={(e) => handleChange('name', e.target.value)}
// 						placeholder="Enter the name of material"
// 						value={form.name}
// 					/>
// 				</div>
// 				<div className="">
// 					<Select
// 						id="type"
// 						disabled={loading}
// 						label="Test Type"
// 						name="type"
// 						placeholder="Select Test Type"
// 						error={errors.type}
// 						onSelect={(value) => handleChange('type', value)}
// 						options={[
// 							{
// 								value: 'compression',
// 								label: 'Compression',
// 							},
// 							{
// 								value: 'tension',
// 								label: 'Tension',
// 							},
// 							{
// 								value: 'torsion',
// 								label: 'Torsion',
// 							},
// 						]}
// 						value={form.type}
// 					/>
// 				</div>
// 				<div>
// 					<Input
// 						label="Length of Material (in mm)"
// 						error={errors.length}
// 						id="length"
// 						name="length"
// 						disabled={loading}
// 						type="number"
// 						onChange={(e) => handleChange('length', e.target.value)}
// 						placeholder="Length of Material (in mm)"
// 						value={form.length}
// 					/>
// 				</div>
// 				<div className="mt-6 flex items-center gap-x-6">
// 					<Link to={routes.HOME_PAGE}>
// 						<Button disabled={loading} size="large" htmlType="button" type="default">
// 							<span className="px-2 text-gray-700 text-sm md:px-2 md:text-base">Go Back</span>
// 						</Button>
// 					</Link>
// 					<Button
// 						disabled={loading}
// 						loading={loading}
// 						name="submit"
// 						htmlType="submit"
// 						size="large"
// 						type="primary"
// 					>
// 						<span className="px-2 text-gray-100 text-sm md:px-4 md:text-base">Start Test</span>
// 					</Button>
// 				</div>
// 			</form>
// 			<Modal
// 				onCancel={() => setOpen(false)}
// 				title={loading ? 'Test In Progress' : 'Test Completed'}
// 				open={open}
// 				maskClosable={false}
// 				footer={null}
// 				centered
// 			>
// 				<div className="min-h-[40vh] p-4 w-full">
// 					{loading ? (
// 						<div className="flex flex-col items-center justify-center ">
// 							<div className="py-3">
// 								<Spin spinning size="large" />
// 							</div>
// 							<p className="font-medium animate-pulse text-sm my-3 text-secondary-500 text-center">
// 								Test in Progress...
// 							</p>
// 						</div>
// 					) : (
// 						<div className="flex flex-col items-center">
// 							<span className="text-green-600 text-6xl">
// 								<CheckCircleOutlined className="text-green-600" />
// 							</span>
// 							<p className="font-medium text-sm my-3 text-secondary-500 text-center">
// 								Test Completed
// 							</p>
// 							<Link className="my-3" to={routes.RESULT_PAGE}>
// 								<Button size="large" htmlType="button" type="primary">
// 									<span className="px-2 text-gray-100 text-sm md:px-2 md:text-base">
// 										View Result
// 									</span>
// 								</Button>
// 							</Link>
// 						</div>
// 					)}
// 				</div>
// 			</Modal>
// 		</>
// 	);
// }

// export default Page;
