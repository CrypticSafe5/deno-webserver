import { serve } from 'https://deno.land/std@0.88.0/http/server.ts';

export default class Express {
	constructor() {
		this._routes = {
			GET: {},
			POST: {}
		};
		this._middleware = [];
		this.post = this.post.bind(this);
		this.get = this.get.bind(this);
		this.listen = this.listen.bind(this);
	}

	post(route, callback) {
		this._routes.GET[route] = callback;
	}

	get(route, callback) {
		console.log('doig things');
		this._routes.GET[route] = callback;
	}

	use(callback) {
		this._middleware.push(callback);
	}

	async listen({ hostname, port }, callback) {
		const server = serve({ hostname, port });
		if (callback && typeof callback === 'function') callback();
		for await (const { method, url } of server) {
			try {
				for (const middleware of this._middleware) middleware();
				this._routes[method][url]();
			} catch (err) { }
		}
	}
};
