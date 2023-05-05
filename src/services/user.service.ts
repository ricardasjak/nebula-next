import { redisUtil } from '@/utils/redis.util';
import { User } from '@clerk/backend/dist/types/api/resources';
import { Redis } from '@upstash/redis';

export const userService = {
	register: async (userId: string, user: User) => {
		const userKey = redisUtil.userKey(userId);
		const redis = Redis.fromEnv();
		await redis.json.set(userKey, '$', user);
		console.info('User was registered: ', user.emailAddresses[0]);
	},
};
