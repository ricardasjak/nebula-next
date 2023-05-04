/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverActions: true,
	},
	// output: 'standalone',
};

module.exports = nextConfig;
