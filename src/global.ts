import { Kingdom } from '@/app/kingdom/kingdom.model';
import { User as ClerkUser } from '@clerk/backend/dist/types/api/resources';

export interface GlobalState {
	serverStatus: ServerStatus;
	roundStatus: Map<number, RoundStatus>;
	users: Map<string, User>;
	kingdoms: Map<number, Kingdom>;
	profiles: Map<number, Profile>;
	counter: number;
	initialised: boolean;
}

export interface RoundStatus {
	id: number;
	title?: string;
	description?: string;
}

export interface ServerStatus {
	roundId: number;
	mode: 'maintenance' | 'paused' | 'sign-ups' | 'newbie-mode' | 'game-mode' | 'chaos-mode';
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
