export default () => 'Hello kingdom';

// import { redirect } from 'next/navigation';
//
// return createServerData$(async (_, { request }) => {
// 		const user = await AccountService.getUser(request);
// 		const kingdoms = (
// 			AccountRepository.account(user.accountId).kingdoms || []
// 		).map((kdId) => {
// 			return KingdomRepository.kingdom(kdId);
// 		});
//
// 		console.log('returning kingdoms...', kingdoms.length);
// 		return kingdoms;
// 	});
// };
//
// export const KingdomStartPage = (): JSXElement => {
// 	const data = useRouteData<typeof KingdomCreatePageData>();
//
// 	const [action, { Form }] = createServerAction$(
// 		async (form: FormData, { request }) => {
// 			const user = await AccountService.getUser(request);
// 			const name = form.get('name') as string;
// 			const ruler = form.get('ruler') as string;
// 			const id = AccountService.createKingdom(
// 				user.accountId,
// 				name,
// 				ruler
// 			);
// 			throw redirect(`/kingdom/${id}`);
// 		}
// 	);
//
// 	return (
// 		<div>
// 			<Show when={data()?.length} fallback={null} keyed={false}>
// 				<h1>Kingdoms list</h1>
// 				<ul>
// 					<For each={data()}>
// 						{(kd) => (
// 							<li>
// 								<A href={`/kingdom/${kd.id}`}>{kd.name}</A>
// 							</li>
// 						)}
// 					</For>
// 				</ul>
// 			</Show>
//
// 			<h1>Create Kingdom</h1>
// 			<Form>
// 				<fieldset>
// 					<legend>Create a new kingdom</legend>
// 					<label for='name'>Kingdom name</label>
// 					<input
// 						name='name'
// 						placeholder='Kingdom name'
// 						type='text'
// 						maxlength={24}
// 						minlength={3}
// 						style={{ width: '240px' }}
// 					/>
// 					<br />
//
// 					<label for='ruler'>Ruler name</label>
// 					<input
// 						name='ruler'
// 						placeholder='Ruler name'
// 						type='text'
// 						maxLength={24}
// 						minLength={2}
// 						style={{ width: '240px' }}
// 					/>
// 					<br />
// 					<button type='submit' disabled={action.pending}>
// 						Create
// 					</button>
// 				</fieldset>
// 			</Form>
// 		</div>
// 	);
// };
