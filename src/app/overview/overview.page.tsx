import { OverviewKingdoms } from '@/app/overview/overview-kingdoms.component';
import { player } from '@/services/player.service';

export const OverviewPage = async () => {
	const kingdoms = await player.kingdoms();
	return (
		<div className={' py-4'}>
			<OverviewKingdoms kingdoms={kingdoms} />
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
