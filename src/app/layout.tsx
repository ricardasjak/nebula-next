import { appState } from '@/app-state';
import { Footer } from '@/components/footer/footer.component';
import { Header } from '@/components/header/header.component';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const TITLE = 'Nebula Kingdoms - MMO game';
export const revalidate = 0;
export const metadata = {
	title: TITLE,
	description: TITLE,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const state = await appState();
	console.log({ state });
	return (
		<html lang='en'>
			<head>
				<title>{TITLE}</title>
			</head>
			<ClerkProvider>
				<body className={inter.className}>
					<div className={'flex h-screen flex-col  bg-blue-100'}>
						{/* @ts-expect-error Async Server Component */}
						<Header />
						<div className={'container mx-auto flex-grow'}>{children}</div>
						<Footer {...state} />
					</div>
				</body>
			</ClerkProvider>
		</html>
	);
}
