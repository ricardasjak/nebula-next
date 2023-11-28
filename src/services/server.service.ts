import { appState } from '@/app-state';
import { userService } from '@/app/user/user.service';
import { db } from '@/db';
import { GlobalState } from '@/global';

export const server = {
	status: async () => (await appState()).serverStatus,
	tick: async () => (await server.status()).tick,
	now: () => new Date().toISOString(),
	loadState: async (): Promise<GlobalState> => {
		console.time('loading server state');
		const users = await userService.loadUsers();
		const profiles = await userService.loadProfiles();
		const serverStatus = await db.serverStatus.load();
		const kingdoms = await db.kingdoms.loadAll(serverStatus.roundId);
		console.log({ kingdoms });
		const snaps = await db.snapshots.loadAll(serverStatus.roundId, serverStatus.tick);
		console.timeEnd('loading server state');
		console.log(snaps.size);

		return {
			serverStatus,
			kingdoms,
			profiles,
			users,
			counter: 0,
			initialised: true,
			roundStatus: new Map(),
			snapshots: snaps.size ? new Map().set(serverStatus.tick, snaps) : new Map(),
		};
	},
};
