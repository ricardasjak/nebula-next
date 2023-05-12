'use client';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
	serverUserId: string | null;
}

export const AuthReloader: React.FC<Props> = ({ serverUserId }) => {
	const user = useAuth();
	const { refresh } = useRouter();

	useEffect(() => {
		if (user.userId && user.userId !== serverUserId) {
			refresh();
		}
	}, [refresh, serverUserId, user.userId]);

	return null;
};
