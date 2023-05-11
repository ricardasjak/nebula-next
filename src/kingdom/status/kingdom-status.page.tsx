// import { JSXElement } from 'solid-js';
// import { RouteDataArgs, useParams, useRouteData } from 'solid-start';
// import { createServerData$ } from 'solid-start/server';
// import { KingdomRepository } from '~/kingdom/kingdom.repository';
//
// export const KingdomStatusPageData = ({ params }: RouteDataArgs) => {
// 	return createServerData$(
// 		(id) => {
// 			const kdId = parseInt(id);
// 			if (kdId) {
// 				return KingdomRepository.kingdom(parseInt(id));
// 			}
// 		},
// 		{
// 			key: () => params.id,
// 		}
// 	);
// };
//
// export const KingdomStatusPage = (): JSXElement => {
// 	const params = useParams();
// 	const data = useRouteData<typeof KingdomStatusPageData>();
// 	console.log('render KingdomStatusPage', params);
// 	return (
// 		<div>
// 			<h1>My Kingdom</h1>
// 			<pre>{JSON.stringify(data() || {}, null, 2)}</pre>
// 		</div>
// 	);
// };
