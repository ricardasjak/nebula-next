import { appState } from '@/app-state';

export const player = {
	profile: async (userId: string | null) => {
		const { users, profiles } = await appState();
		return profiles.get(users.get(userId || '')?.profileId || 0);
	},
};
