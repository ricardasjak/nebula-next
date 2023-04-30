import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Set the paths that don't require the user to be signed in
const publicPaths = ['/', '/sign-in*', '/sign-up*'];

const isPublic = (path: string): boolean => {
	const publicPath = publicPaths.find((x) =>
		path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
	);
	return !!publicPath;
};

// export default withClerkMiddleware((req: NextRequest) => {
// 	return NextResponse.next();
// });

export default withClerkMiddleware((request: NextRequest) => {
	// if the user is not signed in redirect them to the sign in page.
	const auth = getAuth(request);
	if (isPublic(request.nextUrl.pathname)) {
		return NextResponse.next();
	}
	if (!auth.userId) {
		// redirect the users to /pages/sign-in/[[...index]].ts
		const signInUrl = new URL('/sign-in', request.url);
		signInUrl.searchParams.set('redirect_url', request.url);
		return NextResponse.redirect(signInUrl);
	}
	return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next
		 * - static (static files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 * - public folder
		 */
		'/((?!static|.*\\..*|_next|favicon.ico).*)',
		'/',
	],
};
