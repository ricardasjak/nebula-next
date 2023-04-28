import { server } from '@/global';

export async function GET(request: Request) {
	server.counter++;
	return new Response('Hello, Next.js! ' + server);
}
