import { userService } from '@/app/user/user.service';
import { GlobalState } from '@/global';

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
		initialised: false,
	};
}

export const appState = async () => {
	if (!global.__appState__.initialised) {
		console.log('**************** LOADING STATE ***************');
		global.__appState__.users = await userService.loadUsers();
		global.__appState__.profiles = await userService.loadProfiles();
		global.__appState__.initialised = true;
	}
	return global.__appState__;
};
