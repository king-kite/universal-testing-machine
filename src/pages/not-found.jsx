import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Page() {
	return (
		<div className="container flex flex-col justify-between min-h-screen mx-auto p-4">
			<div className="">
				<h1 className="uppercase font-bold text-primary-500 tracking-wider text-xl">utm</h1>
			</div>
			<div className="flex flex-col items-center justify-center relative bottom-14 w-full">
				<h1 className="font-black my-3 text-primary-600 text-4xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
					404
				</h1>
				<p className="font-medium my-3 text-center text-secondary-500 text-sm md:text-base">
					Sorry, page was not found.
				</p>
				<Link to="/">
					<Button>
						<span>Go Back Home</span>
					</Button>
				</Link>
			</div>
			<div className="h-px w-px" />
		</div>
	);
}

export default Page;
