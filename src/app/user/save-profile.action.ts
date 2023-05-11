import { player } from '@/app/user/player.service';
import { userService } from '@/app/user/user.service';
import { routesUtil } from '@/utils/routes.util';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export const saveProfile = async (data: FormData) => {
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
