'use client';
import { Kingdom } from '@/models/kingdom.model';
import { routesUtil } from '@/utils/routes.util';
import Link from 'next/link';

export const OverviewKingdoms: React.FC<{ kingdoms: Kingdom[] }> = ({ kingdoms }) => {
	return (
		<ul className={'mx-auto w-fit'}>
			{kingdoms.map((kd) => {
				return (
					<li key={kd.id} className={''}>
						<Link
							href={routesUtil.overview.kingdom(kd.id)}
							prefetch={false}
							className={
								'flex w-fit flex-row px-4 py-2 hover:cursor-pointer hover:bg-blue-200'
							}
						>
							<div className={'w-80'}>{`${kd.name} (x:${kd.x}, y:${kd.y})`}</div>
							<div className={'w-24'}>{kd.planet}</div>
							<div className={'w-24'}>{kd.race}</div>
							<div className={'w-24  text-right'}>{kd.land.toLocaleString()}</div>
							<div className={'w-24 text-right'}>{kd.nw.toLocaleString()}</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
