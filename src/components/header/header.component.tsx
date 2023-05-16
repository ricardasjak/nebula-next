import { player } from '@/app/user/player.service';
import { AuthReloader, LoginButton } from '@/components';
import { routesUtil } from '@/utils/routes.util';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export const Header = async () => {
	const { userId } = auth();
	const profile = await player.profile(userId);

	return (
		<div className='flex w-screen flex-row justify-between gap-4 border-b-2 bg-blue-800 px-8 py-8 text-red-100'>
			<AuthReloader serverUserId={userId} />
			{userId ? (
				<>
					{profile ? (
						<Link href={routesUtil.userProfile}>Welcome, {profile.nickname}</Link>
					) : (
						<Link href={routesUtil.userProfile}>Create profile</Link>
					)}
				</>
			) : (
				<div></div>
			)}
			<nav className={'grid grid-flow-col gap-8'}>
				<Link href={routesUtil.userProfile}>Profile</Link>
				<Link href={routesUtil.overview.status}>My Kingdoms</Link>
				<Link href={routesUtil.kingdomCreate}>Create Kingdom</Link>
			</nav>
			<nav className={'grid grid-flow-col gap-8'}>
				<Link href={routesUtil.userProfile}>Profile</Link>
				<Link href={routesUtil.kingdomCreate}>Kingdom</Link>
			</nav>
			<LoginButton />
		</div>
	);
};
