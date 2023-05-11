// import { JSXElement } from 'solid-js';
// import { A, Outlet } from 'solid-start';
//
// export const KingdomPageLayout = (): JSXElement => {
// 	return (
// 		<div style={{ border: '1px solid black', padding: '8px' }}>
// 			<A href='/'>Home</A>&nbsp;&nbsp;
// 			<A href='/kingdom'>Select Kingdom</A>
// 			<Outlet />
// 		</div>
// 	);
// };

import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const TITLE = 'Nebula Kingdoms - MMO game';
export const metadata = {
	title: TITLE,
	description: TITLE,
};

export default function KingdomLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<pre>KD layout</pre>
			{children}
		</div>
	);
}
