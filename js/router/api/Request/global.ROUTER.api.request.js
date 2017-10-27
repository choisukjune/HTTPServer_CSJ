global.ROUTER.api.request = function( req, res, d, pathname ){
	var decodeURIComponent_Data = decodeURIComponent( req.url ).replace(/^.*\?/, '');
	var data = global.REQUIRES.querystring.parse( decodeURIComponent_Data )

	var _q = JSON.parse( data.data )


    global.CSJLog.timeStamp( "_q : " + JSON.stringify( data,null,4 ) );


	var options = {
		hostname: _q.host
		, port: _q.port
		, path: _q.path
		, method: _q.method
		//, headers: {
		//   'Content-Type': 'application/x-www-form-urlencoded',
		//   //'Content-Length': Buffer.byteLength(postData)
		// }
		// , data : {
		//   a : "a",
		//   b : "b"
		// }
	};

	global.api.Request.request__GET( options, _q.characterSet ,function( responseText ){
	global.api.Response.res_200_ok_String( req, res, responseText )
	});
};
