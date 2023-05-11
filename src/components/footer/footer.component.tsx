import { GlobalState } from '@/global';

export const Footer = (state: GlobalState) => {
	return (
		<div className={'bg-blue-800 p-8 text-red-100'}>
			<p>users: {state.users.size}</p>
			<p>profiles: {state.profiles.size}</p>
		</div>
	);
};
