//'use client';
import { UserButton, auth } from '@clerk/nextjs';
import { NextApiRequest } from 'next';

export const Header: React.FC<{ req?: NextApiRequest }> = ({ req }) => {
	// const { signOut, isSignedIn, isLoaded } = useAuth();
	const clerkAuth = auth();
	// console.log({ clerkAuth });

	return (
		<div className='flex flex-row gap-4 border-b-2 p-4'>
			<UserButton />
			{/*{isLoaded &&*/}
			{/*	(isSignedIn ? (*/}
			{/*		<span role={'button'} onClick={() => signOut()} className={'justify-self-end'}>*/}
			{/*			Logout*/}
			{/*		</span>*/}
			{/*	) : (*/}
			{/*		<>*/}
			{/*			<a className={'justify-self-end'} href={'/sign-up'}>*/}
			{/*				Create account*/}
			{/*			</a>*/}
			{/*			<a className={'justify-self-end'} href={'/sign-in'}>*/}
			{/*				Login*/}
			{/*			</a>*/}
			{/*		</>*/}
			{/*	))}*/}
		</div>
	);
};
