import { appState } from '@/app-state';
import { userService } from '@/app/user/user.service';
import { db } from '@/db';
import {
	Buildings,
	BuildingType,
	CreateKingdom,
	Kingdom,
	KingdomSnapshot,
	Snapshot,
} from '@/models/kingdom.model';
import { NEW_KINGDOM_SNAPSHOT } from '@/services/parameters/new-kingdom-snapshot.const';
import { player } from '@/services/player.service';
import { server } from '@/services/server.service';
import { dateUtil } from '@/utils/date.util';
import { mapUtil } from '@/utils/map.util';

export const kingdom = {
	createKingdom: async (profileId: number, payload: CreateKingdom) => {
		const profile = await player.profile2();
		const { tick, roundId } = await server.status();

		const { kingdoms, profiles, snapshots } = await appState();
		const id = await kingdom.getNewKingdomId(roundId);
		console.log('new kd id:', id);

		const newKingdom: Kingdom = {
			id,
			roundId,
			accountId: profileId,
			galaxy: 1,
			sector: 1,
			nickname: profile.nickname,
			created: dateUtil.getNow(),
			x: Math.floor(Math.random() * 100),
			y: Math.floor(Math.random() * 100),
			nw: 25_000,
			land: 250,
			...payload,
		};

		const firstSnapshot: KingdomSnapshot = {
			tick,
			kdId: id,
			created_at: server.now(),
			snapshot: {
				...NEW_KINGDOM_SNAPSHOT,
				x: newKingdom.x,
				y: newKingdom.y,
				land: 0,
				nw: 0,
			},
		};

		const nw = kingdom.networth(firstSnapshot);
		firstSnapshot.snapshot.nw = nw;
		newKingdom.nw = nw;

		// const redis = Redis.fromEnv();
		// // @ts-ignore
		// await redis.json.set(redisUtil.kingdom(roundId, id), '$', newKingdom);
		kingdoms.set(id, newKingdom);
		profile.current = id;

		if (!snapshots.has(tick)) snapshots.set(tick, new Map());
		snapshots.get(tick)!.set(id, firstSnapshot);

		await db.kingdoms.updateAll(roundId, kingdoms);
		await db.snapshots.updateAll(roundId, tick, snapshots.get(tick)!);
		await userService.saveProfiles(profiles);

		console.info('createKingdom: success', id, payload.name);
		return id;
	},
	snapshot: async (kdid: number): Promise<Snapshot> => {
		const tick = await server.tick();
		const { snapshots } = await appState();
		const result = snapshots.get(tick)?.get(kdid)?.snapshot;
		if (!result) {
			throw `Kingdom: snapshot not found. Tick: ${tick}, kdid: ${kdid}`;
		}
		return result;
	},
	getNewKingdomId: async (roundId: number) => {
		const { kingdoms } = await appState();
		const maxId = mapUtil.toKeys(kingdoms).reduce((result, id) => {
			return Math.max(id, result);
		}, 0);
		const newId = maxId + 1;
		const kd = await db.kingdoms.loadOne(roundId, newId);
		return kd ? newId + 1 : newId;
	},
	networth: ({ snapshot: kd }: KingdomSnapshot): number => {
		const { tr, tf, dr, ld, lt, sci, hgl, t, sol } = kd.military;

		return (
			kd.land * 25 +
			kd.probes +
			kd.pop +
			Math.floor(kd.money / 500) +
			kingdom.landBuilt(kd.buildings) * 25 +
			tr * 6 +
			tf * 18 +
			dr * 7 +
			ld * 8 +
			lt * 7 +
			sci * 8 +
			hgl * 12 +
			t * 22 +
			sol * 3
		);
	},
	landBuilt: (b: Buildings): number => {
		return Object.keys(b).reduce((result: number, key) => {
			result += (b[key as BuildingType] || 0) as number;
			return result;
		}, 0);
	},
};
