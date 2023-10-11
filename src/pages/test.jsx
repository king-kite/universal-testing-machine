/* eslint-disable no-mixed-spaces-and-tabs */
import { RetweetOutlined, ToTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import React from 'react';

import ResultChart from '../components/chart';
import { Select } from '../components/controls';
import TestForm from '../components/test-form';
import { getData, setData } from '../firebase/database';

const activeColor = 'bg-primary-700 text-gray-100';
const inactiveColor = 'bg-white text-primary-700 hover:bg-gray-100';

const COMPRESSION = 1;
const TENSILE = 2;
const TORSION = 3;

const keys = {
	clampDistance: 'clamp1Distance', // Distance Value
	clampMotion: 'clampMotion', // Moves the clamp in speicified direction
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

	const [clampMotion, setClampMotion] = React.useState(0);

	const [clampDistance, setClampDistance] = React.useState(0);
	const [currentClampDistance, setCurrentClampDistance] = React.useState(null);

	const [testStatus, setTestStatus] = React.useState(0);
	const [testType, setTestType] = React.useState(0);

	const [forces, setForces] = React.useState([]);
	const formRef = React.useRef();

	const extension = React.useMemo(() => {
		if (currentClampDistance !== null) {
			let value = clampDistance - currentClampDistance;
			if (value < 0) value *= -1;
			return value;
		}
		return 0;
	}, [clampDistance, currentClampDistance]);

	React.useEffect(() => {
		getData('', {
			onSuccess: (data) => {
				const testType = data[keys.testType] ? +data[keys.testType] : 0;
				const testStatus = data[keys.testStatus] ? +data[keys.testStatus] : 0;
				setCompressiveForce(data[keys.compressiveForce] ? +data[keys.compressiveForce] : 0);
				setTensileForce(data[keys.tensileForce] ? +data[keys.tensileForce] : 0);
				setTorsionalForce(data[keys.torsionalForce] ? +data[keys.torsionalForce] : 0);
				setClampMotion(data[keys.clampMotion] ? +data[keys.clampMotion] : 0);
				setTestStatus(testStatus);
				setTestType(testType);

				if (testStatus !== 0) {
					setCurrentClampDistance(data[keys.clampDistance] ? +data[keys.clampDistance] : 0);
				} else {
					setClampDistance(data[keys.clampDistance] ? +data[keys.clampDistance] : 0);
				}
			},
			onError: (error) => {
				window.alert('Error :' + error.message);
			},
		});
	}, []);

	return (
		<div>
			<h2 className="font-bold my-3 text-primary-500">Test</h2>

			<div className="my-4 py-2">
				<Select
					label="Test Type"
					onSelect={(value) => {
						setData('/' + keys.testType, +value, {
							onError(error) {
								window.alert('Error: ' + error.message);
							},
						});
					}}
					options={[
						{
							label: 'OFF',
							value: ![1, 2, 3].includes(+testType) ? String(testType) : '0',
						},
						{
							label: 'Compression',
							value: String(COMPRESSION),
						},
						{
							label: 'Tension',
							value: String(TENSILE),
						},
						{
							label: 'Torsion',
							value: String(TORSION),
						},
					]}
					value={String(testType || 0)}
				/>
			</div>

			<div className="my-2 py-2 grid grid-cols-1 gap-4 w-full sm:grid-cols-2 lg:grid-cols-3">
				<div className="w-full">
					<span
						onClick={() => {
							setData('/' + keys.clampMotion, +clampMotion === COMPRESSION ? 0 : COMPRESSION, {
								onError(error) {
									window.alert('Error: ' + error.message);
								},
							});
						}}
						className={`${
							+clampMotion === COMPRESSION ? activeColor : inactiveColor
						} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<VerticalAlignBottomOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Compression</h3>
				</div>
				<div className="w-full">
					<span
						onClick={() => {
							setData('/' + keys.clampMotion, +clampMotion === TENSILE ? 0 : TENSILE, {
								onError(error) {
									window.alert('Error: ' + error.message);
								},
							});
						}}
						className={`${
							+clampMotion === TENSILE ? activeColor : inactiveColor
						} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md rotate-180 transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<ToTopOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Tension</h3>
				</div>
				<div className="w-full">
					<span
						onClick={() => {
							setData('/' + keys.clampMotion, +clampMotion === TORSION ? 0 : TORSION, {
								onError(error) {
									window.alert('Error: ' + error.message);
								},
							});
						}}
						className={`${
							+clampMotion === TORSION ? activeColor : inactiveColor
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
					<h1 className="text-xl mt-2 font-black text-primary-700 sm:text-2xl md:text-3xl">
						{extension}mm
					</h1>
				</div>
			</div>

			<div className="my-2 py-4">
				<ResultChart
					title="compression"
					force={compressiveForce}
					start={+testType === COMPRESSION && +testStatus === 1}
					onSave={({ forces }) => {
						setForces(forces);
						if (formRef.current) {
							formRef.current.openModal();
						}
					}}
				/>
				<ResultChart
					title="torsion"
					force={torsionalForce}
					start={+testType === TORSION && +testStatus === 1}
					onSave={({ forces }) => {
						setForces(forces);
						if (formRef.current) {
							formRef.current.openModal();
						}
					}}
				/>
				<ResultChart
					title="tension"
					force={tensileForce}
					start={+testType === TENSILE && +testStatus === 1}
					onSave={({ forces }) => {
						setForces(forces);
						if (formRef.current) {
							formRef.current.openModal();
						}
					}}
				/>
				{/* <ResultDetail /> */}
			</div>
			<TestForm
				extension={extension}
				type={+testType === TENSILE ? 'tension' : +testType === TORSION ? 'torsion' : 'compression'}
				forces={forces}
				ref={formRef}
			/>
		</div>
	);
}

export default Page;
