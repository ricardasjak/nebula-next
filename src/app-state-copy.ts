// import { GlobalState } from '@/global';
// import { server } from '@/services/server.service';
//
// const isProduction = process.env.NODE_ENV === 'production'; // && false;
//
// declare global {
// 	var __appState__: GlobalState;
// 	var __loading__: boolean;
// }
//
// if (!global.__appState__) {
// 	global.__appState__ = {
// 		counter: 0,
// 		users: new Map(),
// 		profiles: new Map(),
// 		kingdoms: new Map(),
// 		roundStatus: new Map(),
// 		snapshots: new Map(),
// 		serverStatus: { roundId: 0, mode: 'maintenance', tick: 0 },
// 		initialised: false,
// 	};
// }
//
// export const appState = async () => {
// 	return Promise.resolve(global.__appState__);
// };
//
// if (!global.__appState__.initialised && !global.__loading__) {
// 	console.log('**************** LOADING STATE ON SERVER INIT ***************');
// 	global.__loading__ = true;
// 	server.loadState().then((s) => {
// 		global.__appState__ = s;
// 	});
// 	console.log('snapshots size:', global.__appState__.snapshots.size);
// }
