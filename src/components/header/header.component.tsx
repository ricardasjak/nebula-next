import { player } from '@/app/user/player.service';
import { AuthReloader, LinkEx, LoginButton } from '@/components';
import { routesUtil } from '@/utils/routes.util';
import { auth } from '@clerk/nextjs';

export const Header = async () => {
	const { userId } = auth();
	const profile = await player.profile(userId);

	return (
		<div className='flex w-screen flex-row justify-between gap-4 border-b-2 bg-blue-800 px-8 py-8 text-red-100'>
			<AuthReloader serverUserId={userId} />
			{userId ? (
				<>
					{profile ? (
						<LinkEx href={routesUtil.userProfile} prefetch={false}>
							Welcome, {profile.nickname}
						</LinkEx>
					) : (
						<LinkEx href={routesUtil.userProfile} prefetch={false}>
							Create profile
						</LinkEx>
					)}
				</>
			) : (
				<div></div>
			)}
			<nav className={'grid grid-flow-col gap-8'}>
				<LinkEx href={routesUtil.userProfile} prefetch={false}>
					Profile
				</LinkEx>
				<LinkEx href={routesUtil.overview.status} prefetch={false}>
					My Kingdoms
				</LinkEx>
				<LinkEx href={routesUtil.kingdomCreate} prefetch={false}>
					Create Kingdom
				</LinkEx>
			</nav>
			<nav className={'grid grid-flow-col gap-8'}>
				<LinkEx href={routesUtil.userProfile} prefetch={false}>
					Profile
				</LinkEx>
				<LinkEx href={routesUtil.kingdomCreate} prefetch={false}>
					Kingdom
				</LinkEx>
			</nav>
			<pre>{new Date().toLocaleTimeString()}</pre>
			<LoginButton />
		</div>
	);
};
