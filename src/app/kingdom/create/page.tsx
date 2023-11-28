import { userService } from '@/app/user/user.service';
import { Button } from '@/components';
import { PlanetType, PlanetTypes, RaceType, RaceTypes } from '@/models/kingdom.model';
import { kingdom } from '@/services/kingdom.service';
import { player } from '@/services/player.service';
import { routesUtil } from '@/utils/routes.util';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function Page() {
	const user = await userService.getClerkUser(auth()?.userId || '');
	if (!user) {
		throw 'User not found';
	}

	const createKingdom = async (data: FormData) => {
		'use server';
		const profile = await player.profile2();

		console.log('saveProfile action:', data);
		const name = (data.get('name') as string) || '';
		const ruler = (data.get('ruler') as string) || '';
		const planet = data.get('planet') as PlanetType;
		const race = data.get('race') as RaceType;

		console.info('createKingdom: save kingdom', profile.id);
		const id = await kingdom.createKingdom(profile.id, {
			name,
			ruler,
			planet,
			race,
		});

		revalidatePath(routesUtil.kingdomCreate);
		redirect(routesUtil.overview.kingdom(id));
	};

	return (
		<div className={'content'}>
			<h1 className={'size text- mb-4 text-xl font-bold'}>
				{"Dear commander, it's time to start your kingdom"}
			</h1>
			<form action={createKingdom} className={'grid w-1/2 grid-cols-2 gap-4'}>
				<label htmlFor='nickname'>Kingdom name</label>
				<input name='name' type='text' required minLength={3}></input>

				<label htmlFor='nickname'>Ruler name</label>
				<input name='ruler' type='text' required minLength={3}></input>

				<label htmlFor='planet'>Planet type</label>
				<select name='planet' required>
					{PlanetTypes.map((pt) => (
						<option value={pt} key={pt}>
							{pt}
						</option>
					))}
				</select>

				<label htmlFor='race'>Race type</label>
				<select name='race' required>
					{RaceTypes.map((rt) => (
						<option value={rt} key={rt}>
							{rt}
						</option>
					))}
				</select>

				<label></label>
				<Button type='submit' className={'rounded border border-blue-800'}>
					Create Kingdom
				</Button>
			</form>
		</div>
	);
}
