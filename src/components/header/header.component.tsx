import { player } from '@/app/user/player.service';
import { AuthReloader, LoginButton } from '@/components';
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
						<span>Welcome, {profile.nickname}</span>
					) : (
						<span>Create profile</span>
					)}
				</>
			) : (
				<div></div>
			)}
			<LoginButton />
		</div>
	);
};
