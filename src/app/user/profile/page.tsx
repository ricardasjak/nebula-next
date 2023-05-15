import { player } from '@/app/user/player.service';
import { userService } from '@/app/user/user.service';
import { Button } from '@/components';
import { routesUtil } from '@/utils/routes.util';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export default async function Page() {
	const user = await userService.getClerkUser(auth()?.userId || '');
	const profile = await player.profile2();
	if (!user) {
		throw 'User not found';
	}

	const saveProfile = async (data: FormData) => {
		'use server';
		const userId = auth()?.userId || '';
		const profile = await player.profile(userId);
		const user = await userService.getClerkUser(auth()?.userId || '');
		if (!user) {
			throw 'userDetails not found';
		}

		console.log('saveProfile action:', data);
		const nickname = (data.get('nickname') as string) || '';
		const userEmail = (data.get('email') as string) || '';
		const email = (user.emailAddresses || [])[0]?.emailAddress || '';

		if (profile) {
			console.info('Profile page: save profile for user ', userId);
			await userService.saveProfile(userId, {
				...profile,
				nickname,
				userEmail,
			});
		} else {
			console.info('Profile page: create profile for user ', userId);
			await userService.createProfile(userId, {
				userId,
				email,
				nickname,
				current: 0,
				userEmail,
			});
		}

		revalidatePath(routesUtil.userProfile);
		console.info('saveProfile: success', { userId });
	};

	return (
		<div className={'content'}>
			<h1 className={'size text- mb-4 text-xl font-bold'}>
				Dear commander, update your profile information
			</h1>
			<form action={saveProfile} className={'grid w-1/2 grid-cols-2 gap-4'}>
				<label htmlFor='nickname'>Your nickname</label>
				<input
					name='nickname'
					type='text'
					required
					minLength={3}
					defaultValue={profile?.nickname}
				></input>

				<label htmlFor='email'>Your email</label>
				<input
					name='email'
					type='email'
					required
					defaultValue={(user?.emailAddresses || [])[0]?.emailAddress || ''}
				></input>

				<Button type='submit' className={'rounded border border-blue-800'}>
					Save
				</Button>
			</form>
		</div>
	);
}
