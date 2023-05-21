import { Kingdom, KingdomSnapshot } from '@/models/kingdom.model';
import { User as ClerkUser } from '@clerk/backend/dist/types/api/resources';

export type KdID = number;
export type RoundID = number;
export type TickID = number;
export type ProfileID = number;
export type ServerSnapshot = Map<TickID, Map<KdID, KingdomSnapshot>>;

export interface GlobalState {
	serverStatus: ServerStatus;
	roundStatus: Map<RoundID, RoundStatus>;
	users: Map<string, User>;
	kingdoms: Map<KdID, Kingdom>;
	snapshots: ServerSnapshot;
	profiles: Map<ProfileID, Profile>;
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
	tick: number;
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
