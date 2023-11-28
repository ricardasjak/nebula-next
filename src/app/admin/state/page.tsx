import { StateDebugServer } from '@/components/state-debug/state-debug.server';

export const revalidate = 0;
export default async function State() {
	return (
		<div>
			{/*@ts-ignore*/}
			<StateDebugServer />
		</div>
	);
}
