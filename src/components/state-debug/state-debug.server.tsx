import { appState } from '@/app-state';
import { mapUtil } from '@/utils/map.util';

export const StateDebugServer = async () => {
	const { kingdoms, serverStatus, profiles, snapshots, users, ...rest } = await appState();
	return (
		<div>
			<div className={'grid grid-flow-col p-3'}>
				<pre>{JSON.stringify(serverStatus, null, 2)}</pre>
				<pre>{JSON.stringify(mapUtil.toValues(kingdoms), null, 2)}</pre>
				{mapUtil.toValues(snapshots.get(serverStatus.tick)!).map((s) => (
					<pre key={s.kdId}>{JSON.stringify(s, null, 2)}</pre>
				))}
			</div>
			<div className={'grid grid-flow-col p-3'}>
				{mapUtil.toValues(profiles).map((p) => (
					<pre key={p.id}>{JSON.stringify(p, null, 2)}</pre>
				))}
			</div>
			<div className={'grid grid-flow-col p-3'}>
				<pre>{JSON.stringify(rest, null, 2)}</pre>
			</div>
		</div>
	);
};
