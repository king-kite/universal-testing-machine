/* eslint-disable react/prop-types */
import { GroupOutlined, CloseOutlined, HomeOutlined, WindowsOutlined } from '@ant-design/icons';
import React from 'react';

import { SimpleLink } from './links';
import routes from '../config/routes';

const sidebarStyle =
	'bg-white duration-1000 h-full ml-auto overflow-y-auto relative shadow-lg transform w-3/5 md:px-2 md:w-1/3 lg:bg-gray-100 lg:px-0 lg:py-4 lg:translate-x-0 lg:w-full';

const Sidebar = ({ setVisible, visible }, ref) => {
	const links = React.useMemo(
		() => [
			{
				icon: HomeOutlined,
				title: 'History',
				href: routes.HOME_PAGE,
				onClick: () => setVisible(false),
			},
			{
				icon: GroupOutlined,
				title: 'Test',
				href: routes.TEST_PAGE,
				onClick: () => setVisible(false),
			},
			{
				icon: WindowsOutlined,
				title: 'Result',
				href: routes.RESULT_PAGE,
				onClick: () => setVisible(false),
			},
		],
		[setVisible]
	);

	return (
		<nav
			className={`${
				visible ? 'opacity-100 z-[1000]' : 'opacity-0 z-[-100]'
			} duration-500 fixed h-full left-0 top-0 overflow-x-hidden w-full lg:opacity-100 lg:shadow-lg lg:w-1/5 lg:z-0`}
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
			}}
		>
			<div
				ref={ref}
				className={`${visible ? 'translate-x-0' : 'translate-x-full'} ${sidebarStyle}`}
			>
				<div className="flex items-center justify-between px-4 py-5 lg:hidden">
					<span
						className="cursor-pointer duration-300 text-secondary-500 text-lg transform transition hover:scale-105"
						onClick={() => setVisible(false)}
					>
						<CloseOutlined />
					</span>
				</div>
				<div className="hidden p-4 pt-0 md:block">
					<div className="">
						<h1 className="uppercase font-bold text-primary-500 tracking-wider text-xl">utm</h1>
					</div>
				</div>
				<div className="mt-3">
					<div>
						{links.map((props, index) => (
							<SimpleLink key={index} {...props} />
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

Sidebar.displayName = 'Sidebar';

const SidebarComponent = React.forwardRef(Sidebar);

export default SidebarComponent;
