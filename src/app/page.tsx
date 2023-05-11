import { appState } from '@/app-state';
import { SignedIn, SignedOut } from '@clerk/nextjs/app-beta';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const revalidate = 0;

export default async function Home() {
	const t1 = new Date().getTime();
	const { counter } = await appState();
	const t2 = new Date().getTime();

	return (
		<main className='flex flex-col items-center justify-between p-24'>
			<div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
				<p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
					Hello Nebula! {counter}
				</p>
				<pre>Time: {new Date().toISOString()}</pre>sss
				<pre>{JSON.stringify(counter, null, 2)}</pre>
				<pre>{'TIME:' + (t2 - t1).toString()}</pre>
				<div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
					<a
						className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
						href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						By{' '}
						<Image
							src='/vercel.svg'
							alt='Vercel Logo'
							className='dark:invert'
							width={100}
							height={24}
							priority
						/>
					</a>
				</div>
			</div>
			<SignedIn>
				<p>You are signed in!</p>
			</SignedIn>
			<SignedOut>
				<p>You are signed out!</p>
				<Link href='/sign-in'>Sign In</Link>
			</SignedOut>
		</main>
	);
}
