import { GlobalState } from '@/global';
import { routesUtil } from '@/utils/routes.util';
import Link from 'next/link';

export const Footer = (state: GlobalState) => {
	return (
		<div className={'grid grid-flow-col bg-blue-800 p-8 text-red-100'}>
			<div>
				<p>users: {state.users.size}</p>
				<p>profiles: {state.profiles.size}</p>
				<p>kingdoms: {state.kingdoms.size}</p>
			</div>
			<div>
				<Link href={routesUtil.admin.serverStatus}>Admin</Link>
			</div>
		</div>
	);
};