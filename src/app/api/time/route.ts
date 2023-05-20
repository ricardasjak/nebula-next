import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(req: NextRequest) {
	const date = new Date().toISOString();
	//res.headers.set('Cache-Control', 'no-store');
	return NextResponse.json({
		date,
	});
}
