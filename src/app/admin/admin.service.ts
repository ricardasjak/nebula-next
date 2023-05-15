import { appState } from '@/app-state';
import { db } from '@/db';

export const adminService = {
	startNewRound: async () => {
		const { serverStatus } = await appState();
		serverStatus.roundId += 1;
		await db.serverStatus.update(serverStatus);
	},
};
