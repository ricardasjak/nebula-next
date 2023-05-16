import { appState } from '@/app-state';
import { Kingdom } from '@/app/kingdom/kingdom.model';
import { Profile } from '@/global';
import { mapUtil } from '@/utils/map.util';
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
	kingdom: async (id: number): Promise<Kingdom | undefined> => {
		return (await player.kingdoms()).find((kd) => kd.id === id);
	},
	kingdoms: async (): Promise<Kingdom[]> => {
		const profile = await player.profile2();
		const { kingdoms } = await appState();
		return mapUtil.toValues(kingdoms).filter((f) => f.accountId === profile.id);
	},
};
