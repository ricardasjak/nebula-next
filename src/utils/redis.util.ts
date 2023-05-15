export const redisUtil = {
	serverStatus: 'server:status',
	roundInfo: `all:rounds`,
	allUsers: 'all:users',
	allProfiles: 'all:profiles',
	allKingdoms: (roundId: number) => `all:kingdoms:${roundId}`,
	userKey: (userId: string) => userId.split('_').join(':'), //`user:${userId}`,
	profileKey: (profileId: number) => `profile:${profileId}`,
	kingdom: (roundId: number, kdid: number) => `kd:${roundId}:${kdid}`,
};
