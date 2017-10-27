global.api.Request.request__POST = function( o, characterSet, _cb ){
//	var decodeURIComponent_Data = decodeURIComponent( req.url ).replace(/^.*\?/, '');
//	var data = global.REQUIRES.querystring.parse( decodeURIComponent_Data )
//	var _q = JSON.parse( data.data )
//
	var options = {
		hostname: o.host
		, port: o.port
		, path: o.path
		, method: "POST"
		//, headers: {
		//   'Content-Type': 'application/x-www-form-urlencoded',
		//   //'Content-Length': Buffer.byteLength(postData)
		// }
		// , data : {
		//   a : "a",
		//   b : "b"
		// }
	};

	var req = global.REQUIRES.http.request(o, function( res ){

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

	req.end();
};