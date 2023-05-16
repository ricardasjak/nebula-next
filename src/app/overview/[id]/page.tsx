import { KingdomStatusPage } from '@/app/overview/[id]/kingdom-status.page';

export const revalidate = 0;
export default function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	// @ts-ignore
	return <KingdomStatusPage id={id} />;
}
