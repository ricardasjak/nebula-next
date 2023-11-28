import { KdID, RoundID, ServerStatus, TickID } from '@/global';
import { Kingdom, KingdomSnapshot } from '@/models/kingdom.model';
import { redisUtil } from '@/utils/redis.util';
import { Redis } from '@upstash/redis';

const toRecord = (obj: object) => obj as Record<string, unknown>;
const toResult = <T>(redisResponse: T[] | null) => (redisResponse ? redisResponse[0] : undefined);
const toMap = <K = number | string, V = unknown>(redisMap: Record<string, unknown>): Map<K, V> => {
	const result = new Map<K, V>();
	for (const [key, value] of Object.entries(redisMap)) {
		result.set(key as K, value as V);
	}
	//console.log
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
		updateAll: async (roundId: RoundID, kingdoms: Map<number, Kingdom>) => {
			return redis.hset(redisUtil.allKingdoms(roundId), Object.fromEntries(kingdoms));
		},
		loadAll: async (roundId: number): Promise<Map<number, Kingdom>> => {
			const redisData = await redis.hgetall(redisUtil.allKingdoms(roundId));
			console.log('db.kingdoms.loadAll', { redisData });
			if (!redisData) {
				return toMap<number, Kingdom>({});
			}
			return toMap<number, Kingdom>(redisData);
		},
		loadOne: async (roundId: RoundID, kdid: KdID): Promise<Kingdom | undefined> => {
			const redisKingdom = await redis.hget(
				redisUtil.allKingdoms(roundId),
				kdid as unknown as string
			);
			return (redisKingdom as Kingdom) || undefined;
		},
	},
	snapshots: {
		updateAll: async (
			roundId: RoundID,
			tick: TickID,
			snapshots: Map<KdID, KingdomSnapshot>
		) => {
			return redis.hset(redisUtil.allSnapshots(roundId, tick), Object.fromEntries(snapshots));
		},
		loadAll: async (roundId: number, tick: number): Promise<Map<KdID, KingdomSnapshot>> => {
			const redisData = await redis.hgetall(redisUtil.allSnapshots(roundId, tick));
			if (!redisData) {
				return new Map(); //.set(tick, new Map());
			}
			const snap = toMap<KdID, KingdomSnapshot>(redisData);
			return snap;
		},
		loadOne: async (
			roundId: RoundID,
			tick: TickID,
			kdid: KdID
		): Promise<KingdomSnapshot | undefined> => {
			const redisData = await redis.hget(
				redisUtil.allSnapshots(roundId, tick),
				kdid as unknown as string
			);
			return (redisData as KingdomSnapshot) || undefined;
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
