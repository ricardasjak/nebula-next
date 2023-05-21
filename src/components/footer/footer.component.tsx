import { LinkEx } from '@/components';
import { GlobalState } from '@/global';
import { routesUtil } from '@/utils/routes.util';

export const Footer = (state: GlobalState) => {
	return (
		<div className={'grid grid-flow-col bg-blue-800 p-8 text-red-100'}>
			<div>
				<p>users: {state.users.size}</p>
				<p>profiles: {state.profiles.size}</p>
				<p>tick: {state.serverStatus.tick}</p>
			</div>
			<div>
				<p>kingdoms: {state.kingdoms.size}</p>
				<p>snapshots: {state.snapshots.get(state.serverStatus.tick)?.size}</p>
				<p>ticks in memory: {state.snapshots.size}</p>
			</div>
			<div>
				<LinkEx href={routesUtil.admin.serverStatus}>Admin</LinkEx>
			</div>
		</div>
	);
};
