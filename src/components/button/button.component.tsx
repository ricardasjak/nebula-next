import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button: React.FC<Props> = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className='group relative h-12 w-48 overflow-hidden rounded-lg bg-gray-50 text-lg shadow hover:bg-gray-100'
		>
			{children}
		</button>
	);
};
