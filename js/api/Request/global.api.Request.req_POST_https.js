global.api.Request.request__POST_https = function( o, characterSet, _cb ){
//	var decodeURIComponent_Data = decodeURIComponent( req.url ).replace(/^.*\?/, '');
//	var data = global.REQUIRES.querystring.parse( decodeURIComponent_Data )
//	var _q = JSON.parse( data.data )
//
	//var postBody = global.REQUIRES.querystring.escape(JSON.stringify(o.data));
	var postBody = JSON.stringify(o.data);
	console.log( postBody )
	var options = {
		hostname: o.host
		, port: o.port
		, path: o.path
		, method: "POST"
		, headers : o.headers
	};
	options.headers[ 'Content-Length' ] = Buffer.byteLength( o.data );
	// curl -X POST --header 'Content-Type: ' --header 'Accept: application/json' --header 'X-Access-Key: 5af3fe773fcc2fa8' --header 'X-Access-Secret: fbf0ce1cf97738667abbfbabc0ec0b36' -d '{ \
	//      "message": "Your message", \
	//      "botOption": { \
	//          "actAsManager": false, \
	//          "silentToManager": false, \
	//          "silentToGuest": false \
	//      } \
	//  }' 'https://api.channel.io/open/user_chats/690905/messages?botName=sdfsdfsd'


	var req = global.REQUIRES.https.request(options, function( res ){

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
	req.write( decodeURIComponent( postBody ) );
console.log( decodeURIComponent( postBody ) )
	req.end();
};
