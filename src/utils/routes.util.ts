export const routesUtil = {
	homePage: '/',
	hud: '/hud',
	userCreate: '/user/create',
	userProfile: '/user/profile',
	kingdomCreate: '/kingdom/create',
	overview: {
		status: '/overview',
		kingdom: (id: number) => `/overview/${id}`,
	},
	admin: {
		serverStatus: '/admin/server',
		state: '/admin/state',
	},
};
