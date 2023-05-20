import { appState } from '@/app-state';
import { adminService } from '@/app/admin/admin.service';
import { Button } from '@/components';
import { db } from '@/db';
import { mapUtil } from '@/utils/map.util';
import { routesUtil } from '@/utils/routes.util';
import { revalidatePath } from 'next/cache';

export default async function AdminRoundPage() {
	const { serverStatus } = await appState();
	const startNewRound = async (formData: FormData) => {
		'use server';
		if (formData.get('password') === 'admin-nk') {
			await adminService.startNewRound();
			revalidatePath(routesUtil.admin.serverStatus);
		} else {
			throw 'Wrong password';
		}
	};

	const saveTest = async () => {
		'use server';
		const { kingdoms } = await appState();
		await db.test.update(mapUtil.toValues(kingdoms));
	};

	const loadTest = async () => {
		'use server';
		await db.test.load();
	};

	return (
		<div className={'content margin-x-auto'}>
			<h1>Server status:</h1>
			<pre>{JSON.stringify(serverStatus, null, 2)}</pre>
			<form action={startNewRound}>
				<input type={'password'} placeholder={'admin password'} name={'password'} />
				<br />
				<br />
				<Button type={'submit'} className={'button'}>
					Start new round
				</Button>
			</form>

			<form action={saveTest}>
				<Button type={'submit'} className={'button'}>
					Save test
				</Button>
			</form>

			<form action={loadTest}>
				<Button type={'submit'} className={'button'}>
					Load test
				</Button>
			</form>
		</div>
	);
}
