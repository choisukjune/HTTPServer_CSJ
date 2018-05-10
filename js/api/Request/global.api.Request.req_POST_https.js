global.api.Request.request__POST_https = function( o, characterSet, _cb ){
//	var decodeURIComponent_Data = decodeURIComponent( req.url ).replace(/^.*\?/, '');
//	var data = global.REQUIRES.querystring.parse( decodeURIComponent_Data )
//	var _q = JSON.parse( data.data )
//
	console.log( o )
	var postBody = global.REQUIRES.querystring.escape(JSON.stringify(o.data));
	console.log( postBody )
	var options = {
		hostname: o.host
		, port: o.port
		, path: o.path
		, method: "POST"
		, headers : {
		   'Content-Type': 'application/x-www-form-urlencoded',
		   'Content-Length': postBody.length
		}
	};

	var req = global.REQUIRES.https.request(o, function( res ){

		var chunks = [];

		//res.setEncoding('utf8');
		res.on('data', function (chunk) {
			chunks.push( new Buffer( chunk ));
		});
		res.on('end', function () {
			var data = global.api.String.convert_encoding__KR( chunks, characterSet );
			_cb( data );
		});
	});

	req.on('error', function(e){
		global.CSJLog.error('problem with request: ${e.message}');
	});
	req.write( postBody );
	req.end();
};
