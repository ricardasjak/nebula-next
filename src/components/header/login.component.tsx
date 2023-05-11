'use client';
import { routesUtil } from '@/utils/routes.util';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const LoginButton: React.FC = () => {
	const { isLoaded, isSignedIn, signOut } = useAuth();
	const r = useRouter();

	const handleLogout = useCallback(() => {
		signOut().then(() => {
			r.replace(routesUtil.homePage);
		});
	}, [r, signOut]);

	if (!isLoaded) {
		return null;
	}

	return (
		<div>
			{isSignedIn ? (
				<span role={'button'} onClick={handleLogout} className={'justify-self-end'}>
					Logout
				</span>
			) : (
				<>
					<a className={'mr-8 justify-self-end'} href={'/sign-up'}>
						Create account
					</a>
					<a className={'justify-self-end'} href={'/sign-in'}>
						Login
					</a>
				</>
			)}
		</div>
	);
};
