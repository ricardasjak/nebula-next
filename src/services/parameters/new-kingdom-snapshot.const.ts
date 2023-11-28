import { ResearchType, Snapshot } from '@/models/kingdom.model';

const ZERO_RES: ResearchType = {
	points: 0,
	percentage: 0,
	scientists: 0,
};
export const NEW_KINGDOM_SNAPSHOT: Omit<Snapshot, 'x' | 'y' | 'nw' | 'land'> = {
	state: 'Growth',
	money: 300_000,
	probes: 1_000,
	pop: 2_250,
	xp: 0,
	buildings: {
		bar: 20,
		fp: 40,
		res: 80,
		sm: 30,
		tc: 25,
		asb: 0,
		pf: 20,
	},
	queues: {
		buildings: {},
		military: {},
		land: [],
	},
	military: {
		hgl: 0,
		sci: 100,
		lt: 0,
		dr: 0,
		t: 250,
		sol: 500,
		tr: 0,
		tf: 0,
		ld: 0,
	},
	research: {
		pop: { ...ZERO_RES },
		power: { ...ZERO_RES },
		military: { ...ZERO_RES },
		money: { ...ZERO_RES },
	},
};
