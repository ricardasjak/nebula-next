import { appState } from '@/app-state';
import { OverviewKingdoms } from '@/app/overview/overview-kingdoms.component';
import { player } from '@/services/player.service';
import { mapUtil } from '@/utils/map.util';
import React from 'react';

export const OverviewPage = async () => {
	const kingdoms = await player.kingdoms();
	const state = await appState();
	return (
		<div className={' py-4'}>
			<OverviewKingdoms kingdoms={kingdoms} />
			<pre>{JSON.stringify(mapUtil.toValues(state.kingdoms), null, 2)}</pre>
			{/*<ul className={''}>*/}
			{/*	{kingdoms.map((kd) => {*/}
			{/*		return (*/}
			{/*			<li key={kd.id} className={'grid grid-flow-col-dense grid-cols-5 '}>*/}
			{/*				<div className={'w-fit'}>{`${kd.name} (x:${kd.x}, y:${kd.y})`}</div>*/}
			{/*				<div className={'w-12'}>{kd.planet}</div>*/}
			{/*				<div className={'w-24'}>{kd.race}</div>*/}
			{/*				<div className={'w-12'}>{kd.land}</div>*/}
			{/*				<div className={'w-12'}>{kd.nw}</div>*/}
			{/*			</li>*/}
			{/*		);*/}
			{/*	})}*/}
			{/*</ul>*/}
		</div>
	);
};
