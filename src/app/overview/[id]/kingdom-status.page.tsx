import { player } from '@/app/user/player.service';
import { routesUtil } from '@/utils/routes.util';
import Link from 'next/link';

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
			Kingdom {id}
			<pre>{JSON.stringify(kd, null, 2)}</pre>
			<Link href={routesUtil.overview.status}>Back</Link>
		</div>
	);
};
