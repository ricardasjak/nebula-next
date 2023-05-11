// import { LowSync } from 'lowdb';
// import { Kingdom, KingdomBase } from '~/kingdom/kingdom.model';
// import { Console } from '~/utils/console';
// import { DateUtil } from '~/utils/date.util';
// import { DbUtil } from '~/utils/db.util';
// import { initRepository } from '~/utils/initRepository';
//
// type KingdomsType = Record<number, Kingdom>;
// let kingdoms: KingdomsType = {};
// let db: LowSync<KingdomsType>;
//
// export const KingdomRepository = {
// 	init: () => {
// 		db = initRepository<KingdomsType>('kingdoms');
// 		kingdoms = db.data;
// 	},
// 	create: (kd: KingdomBase) => {
// 		const id = DbUtil.getNextId(kingdoms);
// 		kingdoms[id] = { ...kd, id, created: DateUtil.now() };
// 		kingdoms[id].id = id;
//
// 		Console.info('Kingdom created', id, kd);
// 		console.time('write-kingdoms');
// 		db.write();
// 		console.timeEnd('write-kingdoms');
// 		return id;
// 	},
// 	delete: (id: number) => {
// 		delete kingdoms[id];
// 		db.write();
// 		console.info('Kingdom deleted', id);
// 	},
// 	kingdoms: () => kingdoms,
// 	kingdom: (id) => {
// 		if (!kingdoms[id]) {
// 			throw 'Kingdom not found ' + id;
// 		}
// 		return kingdoms[id];
// 	},
// };
