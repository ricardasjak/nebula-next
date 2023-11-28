'use client';

import { Button } from '@/components';
import { GlobalState } from '@/global';

export const StateButton: React.FC<{ data?: GlobalState }> = (props) => {
	return <Button>Show state</Button>;
};
