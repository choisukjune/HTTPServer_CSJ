global.api.REDIS.Connect = function( port, url, pass,_cbFunction)
{
	var r;
	r = global.REQUIRES.redis.createClient( port, url );
		r.auth( pass );

	_cbFunction( r );
}
