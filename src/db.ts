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
			return toResult(result) || { roundId: 0, mode: 'maintenance', tick: 0 };
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
	test: {
		update: async (kd: Kingdom[]) => {
			const payload = {};
			const time = new Date().getMilliseconds();
			for (let i = 0; i < 3000; i++) {
				// @ts-ignore
				payload[time * 10000 + i] = { ...kd[0] };
			}
			console.time('test:redis');
			await redis.hset('test:map', payload);
			console.timeEnd('test:redis');
			console.log('**** payload length: ', JSON.stringify(payload).length.toLocaleString());
		},
		load: async () => {
			console.time('test:redis:load');
			const response = await redis.hgetall('test:map');
			console.timeEnd('test:redis:load');
			console.log('**** response length: ', JSON.stringify(response).length.toLocaleString());
		},
	},
};
