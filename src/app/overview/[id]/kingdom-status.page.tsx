import { LinkEx } from '@/components';
import { kingdom } from '@/services/kingdom.service';
import { player } from '@/services/player.service';
import { routesUtil } from '@/utils/routes.util';

export const revalidate = 0;

interface Props {
	kdid: number;
}
export const KingdomStatusPage = async ({ kdid }: Props) => {
	const kd = await player.kingdom(kdid);
	const {} = await kingdom.snapshot(kdid);
	if (!kd) {
		return <h3>Kingdom does not belong to you, or does not exist.</h3>;
	}
	return (
		<div>
			Kingdom {kdid}, {new Date().toLocaleTimeString()}
			<div>
				<pre>{JSON.stringify(kd, null, 2)}</pre>
				<pre>{JSON.stringify(kd, null, 2)}</pre>
			</div>
			<LinkEx href={routesUtil.overview.status} prefetch={false}>
				Back
			</LinkEx>
		</div>
	);
};
