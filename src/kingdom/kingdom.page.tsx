// import { JSXElement } from 'solid-js';
// import { Outlet, RouteDataArgs, useRouteData } from 'solid-start';
// import { redirect } from 'solid-start/server';
// import { createServerData$ } from 'solid-start/server/browser';
// import { AccountService } from '~/account/account.service';
// import { KingdomRepository } from '~/kingdom/kingdom.repository';
// import { Console } from '~/utils/console';
//
// export const KingdomPageData = ({ params }: RouteDataArgs) => {
// 	return createServerData$(
// 		async (id, { request }) => {
// 			throw redirect('/kingdom');
// 			const user = await AccountService.getUser(request);
// 			const kdId = parseInt(id);
// 			if (kdId) {
// 				const kingdom = KingdomRepository.kingdom(parseInt(id));
// 				console.log({ user, kingdom });
// 				if (kingdom?.accountId === user.accountId) {
// 					return kingdom;
// 				} else {
// 					Console.info('redirect to /kingdoms');
// 					throw redirect('/kingdom');
// 				}
// 			}
// 		},
// 		{
// 			key: () => params.id,
// 		}
// 	);
// };
//
// export const KingdomPage = (): JSXElement => {
// 	const data = useRouteData<typeof KingdomPageData>();
// 	console.log('***** Kingdom page data', data());
//
// 	return (
// 		<div>
// 			<Outlet />
// 		</div>
// 	);
// };
