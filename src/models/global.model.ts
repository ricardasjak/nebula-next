export interface GlobalState {
	users: Map<string, User>;
	kingdoms: Map<number, Kingdom>;
}

export interface User {
	id: string;
	current: number;
	kingdoms: number[];
}

export interface Kingdom {
	id: number;
	userId: string;
}
