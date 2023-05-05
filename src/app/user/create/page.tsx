import { userService } from '@/services/user.service';
import { routesUtil } from '@/utils/routes.util';
import { auth, clerkClient } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function Page() {
	const clerkAuth = auth();
	if (clerkAuth.userId) {
		const userClerk = await clerkClient.users.getUser(clerkAuth.userId);
		if (userClerk) {
			await userService.register(userClerk.id, userClerk);
		}
	}
	redirect(routesUtil.homePage);
}
