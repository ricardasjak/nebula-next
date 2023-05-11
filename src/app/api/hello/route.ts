import { appState } from '@/app-state';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(req: NextRequest) {
	const { userId } = getAuth(req);
	if (!userId) {
		return new Response('User session has expired', {
			status: 401,
			statusText: 'Unauthorized',
		});
	}

	const state = await appState();
	state.counter = state.counter + 1;
	console.log('is equal', global.__appState__ === state);

	const date = new Date().toISOString();
	const res = NextResponse.json({
		state,
		date,
	});
	//res.headers.set('Cache-Control', 'no-store');
	return res;
}
