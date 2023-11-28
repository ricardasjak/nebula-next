import { appState } from '@/app-state';
import { adminService } from '@/app/admin/admin.service';
import { Button } from '@/components';
import { db } from '@/db';
import { kingdom } from '@/services/kingdom.service';
import { server } from '@/services/server.service';
import { mapUtil } from '@/utils/map.util';
import { routesUtil } from '@/utils/routes.util';
import { revalidatePath } from 'next/cache';

export default async function AdminRoundPage() {
	const state = await appState();
	const { serverStatus, kingdoms, snapshots } = state;
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
		revalidatePath(routesUtil.admin.serverStatus);
	};

	const loadTest = async () => {
		'use server';
		await db.test.load();
		revalidatePath(routesUtil.admin.serverStatus);
	};

	const reloadServer = async () => {
		'use server';
		const s1 = { ...(await appState()) };
		await server.loadState();
		const s2 = await appState();
		revalidatePath(routesUtil.admin.serverStatus);
		if (JSON.stringify(s1) === JSON.stringify(s2)) {
			console.log('***** ADMIN, state reload, state has not changed.');
		} else {
			console.log('***** ADMIN, state reload, state HAS changed!!!');
			console.log(s1);
			console.log('------');
			console.log(s2);
			throw 'State has changed';
		}
	};

	return (
		<div className={'content margin-x-auto'}>
			<h1>Server status:</h1>
			<pre>{JSON.stringify(serverStatus, null, 2)}</pre>
			<div className={'grid grid-flow-row grid-cols-2 gap-3'}>
				<div className={'grid grid-flow-row gap-3'}>
					<form action={startNewRound}>
						<input type={'password'} placeholder={'admin password'} name={'password'} />
						<br />
						<br />
						<Button type={'submit'} className={'button'}>
							Start new round
						</Button>
					</form>

					<form action={reloadServer}>
						<Button type={'submit'} className={'button'}>
							Reload state
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
				<div>
					<pre>{JSON.stringify(kingdom, null, 2)}</pre>
					-----
					<pre>{JSON.stringify(snapshots.get(0), null, 2)}</pre>
				</div>
				<div>
					<pre>{JSON.stringify(state, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
}
