import { routesUtil } from '@/utils/routes.util';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return <SignUp path='/sign-up' signInUrl='/sign-in' afterSignUpUrl={routesUtil.userProfile} />;
}
