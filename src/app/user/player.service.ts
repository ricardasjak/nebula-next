import { appState } from '@/app-state';
import { Profile } from '@/global';
import { auth } from '@clerk/nextjs';

export const player = {
	profile: async (userId: string | null) => {
		const { users, profiles } = await appState();
		return profiles.get(users.get(userId || '')?.profileId || 0);
	},
	profile2: async (): Promise<Profile> => {
		const userId = auth()?.userId || '';
		const { users, profiles } = await appState();
		const result = profiles.get(users.get(userId)?.profileId || 0);
		if (!result) throw 'Profile not found';
		return result;
	},
};
