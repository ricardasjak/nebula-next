import { User as ClerkUser } from '@clerk/backend/dist/types/api/resources';

export interface GlobalState {
	users: Map<string, User>;
	kingdoms: Map<number, Kingdom>;
	profiles: Map<number, Profile>;
	counter: number;
	initialised: boolean;
}

export interface User extends ClerkUser {
	profileId: number;
}

export interface Profile {
	id: number;
	userId: string;
	userEmail: string;
	email: string;
	nickname: string;
	current: number;
}

export interface Kingdom {
	id: number;
	userId: string;
}
