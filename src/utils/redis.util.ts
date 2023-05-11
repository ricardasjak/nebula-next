export const redisUtil = {
	userKey: (userId: string) => userId.split('_').join(':'), //`user:${userId}`,
	profileKey: (profileId: number) => `profile:${profileId}`,
	allUsers: 'all:users',
	allProfiles: 'all:profiles',
};
