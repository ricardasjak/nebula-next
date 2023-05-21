import { GlobalState } from '@/global';
import { server } from '@/services/server.service';

const isProduction = process.env.NODE_ENV === 'production'; // && false;

declare global {
	var __appState__: GlobalState;
}

if (!global.__appState__) {
	global.__appState__ = {
		counter: 0,
		users: new Map(),
		profiles: new Map(),
		kingdoms: new Map(),
		roundStatus: new Map(),
		snapshots: new Map(),
		serverStatus: { roundId: 0, mode: 'maintenance', tick: 0 },
		initialised: false,
	};
}

export const appState = async () => {
	if (!global.__appState__.initialised) {
		console.log('**************** LOADING STATE ***************');
		global.__appState__ = await server.loadState();
	}
	return global.__appState__;
};
