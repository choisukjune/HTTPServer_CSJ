global.ROUTER.api.webhook.channelio.recieve_message = function( req, res ){

	var	body = '';
	req.on('data', function	(data) {
		body +=	data.toString();
	   // global.CSJLog.timeStamp("Partial body: " + body);
	})

	req.on('end', function () {

		//var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );
		var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );

		console.log( global.REQUIRES.querystring.escape( decodeURI( body ) ))
		global.CSJLog.timeStamp( JSON.stringify( _q ) )
		console.log( body )
		console.log( _q )

	})
};
