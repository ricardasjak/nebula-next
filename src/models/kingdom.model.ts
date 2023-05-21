export interface Entity {
	id: number;
	created?: string;
	updated?: string;
}

export const PlanetTypes = ['FW', 'Mount'] as const;
export type PlanetType = (typeof PlanetTypes)[number];
export const RaceTypes = ['Xivornai', 'Gistrami'] as const;
export type RaceType = (typeof RaceTypes)[number];

export type KingdomState = 'Mobilization' | 'Growth';

export const BuildingTypes = ['res', 'bar', 'sm', 'fp', 'tc', 'pf', 'asb'] as const;
export type BuildingType = (typeof BuildingTypes)[number];

export const UnitTypes = ['sol', 'lt', 'tr', 'dr', 'ld', 't', 'hgl', 'tf', 'sci'] as const;
export type UnitType = (typeof UnitTypes)[number];

export type Error = string | undefined;

export interface KingdomBase {
	accountId: number;
	roundId: number;
	nickname: string;
	name: string;
	ruler: string;
	sector: number;
	galaxy: number;
	planet: PlanetType;
	race: RaceType;
	x: number;
	y: number;
	nw: number;
	land: number;
}

export interface CreateKingdom {
	name: string;
	ruler: string;
	planet: PlanetType;
	race: RaceType;
}

export type Kingdom = KingdomBase & Entity;

export interface KingdomEntityWithSnapshots extends KingdomBase {
	snapshots: KingdomSnapshot[];
}

// export interface Kingdom extends KingdomEntity {
// 	snapshots: Map<number, KingdomSnapshot>;
// }

export type Buildings = Record<BuildingType, number>;

export type Military = Record<UnitType, number>;

export type ResearchType = {
	points: number;
	scientists: number;
	percentage: number;
};

export type Research = {
	pop: ResearchType;
	power: ResearchType;
	military: ResearchType;
	money: ResearchType;
};

export type Snapshot = {
	state: KingdomState;
	x: number;
	y: number;
	nw: number;
	land: number;
	money: number;
	probes: number;
	pop: number;
	xp: number;
	buildings: Buildings;
	military: Military;
	research: Research;
	queues: {
		buildings: Partial<Record<BuildingType, number[]>>;
		military: Partial<Record<UnitType, number[]>>;
		land?: number[];
	};
};

export type KingdomSnapshot = {
	tick: number;
	kdId: number;
	snapshot: Snapshot;
	created_at?: string;
};
