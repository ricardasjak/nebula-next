// import { routesUtil } from '@/utils/routes.util';
// import { SignIn } from '@clerk/nextjs';
//
// export default function Page() {
// 	return <SignIn signUpUrl='/sign-up' afterSignInUrl={routesUtil.homePage} />;
// }

import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' afterSignInUrl={'/hud'} />;
}
