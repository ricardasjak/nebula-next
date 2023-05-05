import { globalState } from '@/global';
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

	const date = new Date().toISOString();
	globalState.counter++;
	const res = NextResponse.json({ msg: 'Hello Next.js', counter: globalState.counter, date });
	res.headers.set('Cache-Control', 'no-store');
	return res;
}
