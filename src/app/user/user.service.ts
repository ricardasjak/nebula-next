import { appState } from '@/app-state';
import { Profile, User } from '@/global';
import { redisUtil } from '@/utils/redis.util';
import { User as ClerkUser } from '@clerk/backend';
import { clerkClient } from '@clerk/nextjs';
import { Redis } from '@upstash/redis';

export const userService = {
	getClerkUser: async (userId = ''): Promise<ClerkUser | undefined> => {
		if (!userId) {
			return Promise.reject('Account not found.');
		}
		return await clerkClient.users.getUser(userId);
		//
		// const userKey = redisUtil.userKey(userId);
		// const redis = Redis.fromEnv();
		// const user = await redis.json.get(userKey as any, '$' as any);
		// const result = user || { ...clerkUser, profileId: 0 };

		// const { users } = await appState();
		// return users.get(userId);
	},
	saveUser: async (userId: string, user: User) => {
		const { users } = await appState();
		users.set(userId, user);
		await userService.saveUsers(users);
		console.info('User was registered: ', user.emailAddresses[0]);
	},
	createProfile: async (userId: string, newProfile: Omit<Profile, 'id'>) => {
		const id = await userService.getNewProfileId();
		const profile: Profile = { ...newProfile, id };

		await userService.saveProfile(userId, profile);
	},
	saveProfile: async (userId: string, profile: Profile) => {
		const { id } = profile;

		const { profiles, users } = await appState();
		profiles.set(id, profile);
		let user = users.get(userId);

		if (user) {
			user.profileId = profile.id;
		} else {
			const clerkUser = await userService.getClerkUser(profile.userId);
			if (!clerkUser) {
				throw 'userService.saveProfile: user not found';
			}
			user = { ...clerkUser, profileId: id };
			users.set(userId, user);
		}
		await userService.saveUser(userId, user);
		await userService.saveProfiles(profiles);
		// console.log('userService.saveProfile, profiles:', await appState());
	},
	getProfile: async (id: number) => {
		const { profiles } = await appState();
		return profiles.get(id);
	},
	getNewProfileId: async () => {
		const { profiles } = await appState();
		return (profiles.size + 1) * 100 + Math.floor(Math.random() * 100);
	},
	loadUsers: async () => {
		const redis = Redis.fromEnv();
		const redisUsers =
			((await redis.hgetall(redisUtil.allUsers)) as Record<string, User>) || {};
		const result = new Map();
		for (const [key, value] of Object.entries(redisUsers)) {
			result.set(key, value);
		}
		return result as Map<string, User>;
	},
	saveUsers: async (users: Map<string, User>) => {
		const redis = Redis.fromEnv();
		console.info('saveUsers: saving all users');
		await redis.hset(redisUtil.allUsers, Object.fromEntries(users));
		console.info('userService.saveUsers: saved all users');
	},
	loadProfiles: async () => {
		const redis = Redis.fromEnv();
		const redisProfiles =
			((await redis.hgetall(redisUtil.allProfiles)) as Record<string, Profile>) || {};
		const result = new Map<number, Profile>();
		for (const [key, value] of Object.entries(redisProfiles)) {
			result.set(parseInt(key), value);
		}
		return result;
	},
	saveProfiles: async (profiles: Map<number, Profile>) => {
		const redis = Redis.fromEnv();
		console.info('saveProfiles: saving all profiles');
		await redis.hset(redisUtil.allProfiles, Object.fromEntries(profiles));
		console.info('saveProfiles: saved all profiles');
	},
};
