/**
 * [description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @param  {[type]} d   [description]
 * @return {[type]}     [description]
 */
global.ROUTER.api.File.common.download_file_stream = function( req, res, d ){

	var	_q = global.REQUIRES.querystring.parse(	global.REQUIRES.url.parse( decodeURIComponent(	req.url ) ).query );
	
	global.CSJLog.timeStamp( JSON.stringify( _q ) );

	global.api.Session.session_check(req, res, _q.sid, function( d ){

			if( d ){
				if ( global.REQUIRES.fs.existsSync(_q.filePath) ) {
					// Do somethingvar	
				var filestream = global.REQUIRES.fs.createReadStream( _q.filePath );
				filestream.on('finish', function(){ console.log( "---------- finish ----------" ) });
				filestream.on('end', function(){
					//console.log( "---------- end ----------" );
					res.end();
					console.log("end")
				});
				filestream.on('close',	function(){	console.log( "---------- close ----------" ); });
			  
				filestream.pipe(res);
			}

		}
	})
}