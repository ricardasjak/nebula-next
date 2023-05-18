import { player } from '@/app/user/player.service';
import { LinkEx } from '@/components';
import { routesUtil } from '@/utils/routes.util';

export const revalidate = 0;

interface Props {
	id: string;
}
export const KingdomStatusPage = async ({ id }: Props) => {
	const kd = await player.kingdom(parseInt(id));
	if (!kd) {
		return <h3>Kingdom does not belong to you, or does not exist.</h3>;
	}
	return (
		<div>
			Kingdom {id}, {new Date().toLocaleTimeString()}
			<pre>{JSON.stringify(kd, null, 2)}</pre>
			<LinkEx href={routesUtil.overview.status} prefetch={false}>
				Back
			</LinkEx>
		</div>
	);
};
