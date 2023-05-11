import { routesUtil } from '@/utils/routes.util';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return <SignIn signUpUrl='/sign-up' afterSignInUrl={routesUtil.homePage} />;
}
