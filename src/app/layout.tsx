import { Header } from '@/components/header/header.component';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const TITLE = 'Nebula Kingdoms - MMO game';
export const metadata = {
	title: TITLE,
	description: TITLE,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<title>{TITLE}</title>
			</head>
			<ClerkProvider>
				<body className={inter.className}>
					<Header />
					<div>{children}</div>
				</body>
			</ClerkProvider>
		</html>
	);
}
