import { routesUtil } from '@/utils/routes.util';
import { SignUp } from '@clerk/nextjs/app-beta';

export default function Page() {
	return <SignUp signInUrl='/sign-in' afterSignUpUrl={routesUtil.userProfile} />;
}
