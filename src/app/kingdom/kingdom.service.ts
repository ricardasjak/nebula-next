import { appState } from '@/app-state';
import { CreateKingdom, Kingdom } from '@/app/kingdom/kingdom.model';
import { player } from '@/app/user/player.service';
import { userService } from '@/app/user/user.service';
import { db } from '@/db';
import { dateUtil } from '@/utils/date.util';
import { mapUtil } from '@/utils/map.util';

export const kingdomService = {
	createKingdom: async (profileId: number, payload: CreateKingdom) => {
		const profile = await player.profile2();
		const id = await kingdomService.getNewKingdomId();
		const {
			kingdoms,
			profiles,
			serverStatus: { roundId },
		} = await appState();

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
			nw: 25000,
			land: 250,
			...payload,
		};
		// const redis = Redis.fromEnv();
		// // @ts-ignore
		// await redis.json.set(redisUtil.kingdom(roundId, id), '$', newKingdom);
		kingdoms.set(id, newKingdom);
		await db.kingdoms.updateAll(roundId, kingdoms);

		profile.current = id;
		await userService.saveProfiles(profiles);

		console.info('createKingdom: success', id, payload.name);
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
};
