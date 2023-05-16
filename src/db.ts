import { Kingdom } from '@/app/kingdom/kingdom.model';
import { ServerStatus } from '@/global';
import { redisUtil } from '@/utils/redis.util';
import { Redis } from '@upstash/redis';

const toRecord = (obj: object) => obj as Record<string, unknown>;
const toResult = <T>(redisResponse: T[] | null) => (redisResponse ? redisResponse[0] : undefined);
const toMap = <K = number | string, V = unknown>(redisMap: Record<string, unknown>): Map<K, V> => {
	const result = new Map<K, V>();
	for (const [key, value] of Object.entries(redisMap)) {
		result.set(key as K, value as V);
	}
	return result as Map<K, V>;
};
const redis = Redis.fromEnv();

export const db = {
	serverStatus: {
		update: async (serverStatus: ServerStatus) => {
			return redis.json.set(redisUtil.serverStatus, '$', toRecord(serverStatus));
		},
		load: async (): Promise<ServerStatus> => {
			const result = await redis.json.get(redisUtil.serverStatus, '$');
			return toResult(result) || { roundId: 0, mode: 'maintenance' };
		},
	},
	kingdoms: {
		updateAll: async (roundId: number, kingdoms: Map<number, Kingdom>) => {
			return redis.hset(redisUtil.allKingdoms(roundId), Object.fromEntries(kingdoms));
		},
		loadAll: async (roundId: number): Promise<Map<number, Kingdom>> => {
			const redisKingdoms = await redis.hgetall(redisUtil.allKingdoms(roundId));
			if (!redisKingdoms) {
				return new Map();
			}
			return toMap<number, Kingdom>(redisKingdoms);
		},
		loadOne: async (roundId: number, kdid: number): Promise<Kingdom | undefined> => {
			const redisKingdom = await redis.hget(
				redisUtil.allKingdoms(roundId),
				kdid as unknown as string
			);
			return (redisKingdom as Kingdom) || undefined;
		},
	},
};
