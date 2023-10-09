/* eslint-disable no-mixed-spaces-and-tabs */
import { RetweetOutlined, ToTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

import ResultChart from '../components/chart';
// import ResultDetail from '../components/result-detail';

const activeColor = 'bg-primary-700 text-gray-100';
const inactiveColor = 'bg-white text-primary-700 hover:bg-gray-100';

function Page() {
	return (
		<div>
			<h2 className="font-bold my-3 text-primary-500">Test Result</h2>

			<div className="my-2 py-2 grid grid-cols-1 gap-4 w-full sm:grid-cols-2 lg:grid-cols-3">
				<div className="w-full">
					<span
						className={`${activeColor} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<VerticalAlignBottomOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Compression</h3>
				</div>
				<div className="w-full">
					<span
						className={`${inactiveColor} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md rotate-180 transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<ToTopOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Tension</h3>
				</div>
				<div className="w-full">
					<span
						className={`${inactiveColor} border border-solid border-primary-700 cursor-pointer duration-500 flex items-center justify-center p-5 rounded-md transition transform text-xl hover:scale-105 sm:text-2xl md:py-6 md:text-4xl lg:py-7 lg:text-5xl`}
					>
						<RetweetOutlined />
					</span>
					<h3 className="text-gray-700 text-base text-center mt-2 lg:text-lg">Torsion</h3>
				</div>
			</div>

			<div className="my-2 py-2 grid grid-cols-1 gap-4 w-full md:gap-5 md:grid-cols-2 lg:gap-6 lg:grid-cols-3">
				<div className="bg-white border-2 border-solid border-gray-300 p-4 rounded-lg shadow-lg md:p-5 lg:p-6 w-full">
					<h6 className="text-sm font-medium text-secondary-500 md:text-base">System State</h6>
					<h1 className="text-xl mt-2 font-medium text-red-500 sm:text-2xl md:text-3xl">OFF</h1>
				</div>
				<div className="bg-white border-2 border-solid border-gray-300 p-4 rounded-lg shadow-lg md:p-5 lg:p-6 w-full">
					<h6 className="text-sm font-medium text-secondary-500 md:text-base">Distance</h6>
					<h1 className="text-xl mt-2 font-medium text-primary-700 sm:text-2xl md:text-3xl">
						10mm
					</h1>
				</div>
				<div className="bg-white border-2 border-solid border-gray-300 p-4 rounded-lg shadow-lg md:p-5 lg:p-6 w-full">
					<h6 className="text-sm font-medium text-secondary-500 md:text-base">Extension</h6>
					<h1 className="text-xl mt-2 font-medium text-primary-700 sm:text-2xl md:text-3xl">0</h1>
				</div>
			</div>

			<div className="my-2 py-4">
				<ResultChart title="compression" />
				<ResultChart title="torsion" />
				<ResultChart title="tension" />
				{/* <ResultDetail /> */}
			</div>
		</div>
	);
}

export default Page;
