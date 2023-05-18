import { ReactNode } from 'react';

// interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {};
interface Props {
	href: string;
	children: ReactNode;
	prefetch?: boolean;
	className?: string;
}
export const LinkEx: React.FC<Props> = ({ children, href, prefetch = true, className }) => {
	// return (
	// 	<Link href={href} prefetch={false} className={className}>
	// 		{children}
	// 	</Link>
	// );
	return (
		<a href={href} className={className}>
			{children}
		</a>
	);
};
