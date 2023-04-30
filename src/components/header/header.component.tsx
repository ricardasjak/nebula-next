'use client';

import { useAuth } from '@clerk/nextjs';

export const Header: React.FC = () => {
	const { signOut, isSignedIn, isLoaded } = useAuth();
	return (
		<div className='flex flex-row gap-4 border-b-2 p-4'>
			{isLoaded &&
				(isSignedIn ? (
					<span role={'button'} onClick={() => signOut()} className={'justify-self-end'}>
						Logout
					</span>
				) : (
					<>
						<a className={'justify-self-end'} href={'/sign-up'}>
							Create account
						</a>
						<a className={'justify-self-end'} href={'/sign-in'}>
							Login
						</a>
					</>
				))}
		</div>
	);
};
