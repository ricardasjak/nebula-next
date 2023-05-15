import { appState } from '@/app-state';
import { adminService } from '@/app/admin/admin.service';
import { Button } from '@/components';
import { routesUtil } from '@/utils/routes.util';
import { revalidatePath } from 'next/cache';

export default async function AdminRoundPage() {
	const { serverStatus } = await appState();
	const startNewRound = async () => {
		'use server';
		await adminService.startNewRound();
		revalidatePath(routesUtil.admin.serverStatus);
	};

	return (
		<div className={'content margin-x-auto'}>
			<h1>Server status:</h1>
			<pre>{JSON.stringify(serverStatus, null, 2)}</pre>
			<form action={startNewRound}>
				<Button type={'submit'} className={'button'}>
					Start new round
				</Button>
			</form>
		</div>
	);
}
