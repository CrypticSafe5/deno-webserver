import { serve } from 'https://deno.land/std@0.88.0/http/server.ts';

const server = serve({ hostname: '0.0.0.0', port: 8080 });

function middleware(request) {
	console.log('JUST DOING SOME VALIDATION');
}

const routes = {
	GET: {
		'/test': (request) => {
			console.log('hit GET /test');
			request.respond({ status: 200, body: 'hello GET world!' });
		}
	},
	POST: {
		'/test': () => {
			console.log('hit POST /test');
			request.respond({ status: 200, body: 'Hello POST world' });
		}
	}
};

// const myURL = new Deno.URL();
for await (const request of server) {
	try {
		middleware(request);
		routes[request.method][request.url](request);
	} catch (err) { }
}
