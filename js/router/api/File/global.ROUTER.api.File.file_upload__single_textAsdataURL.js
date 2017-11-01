var _storage = {};

/**
 * [description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @param  {[type]} d   [description]
 * @return {[type]}     [description]
 */
global.ROUTER.api.File.file_upload__single_textAsdataURL = function( req, res, d ){

	var _q = decodeURIComponent(req.url).split('?')[ 1 ];
	var q = global.REQUIRES.querystring.parse( _q );

	var _storage_key = q._storage_key;
	var uploadPath =  global.ROOTPath + "/upload/"

	var data = "";
	req.on('data', function( chunk ){

		data += chunk;

	});

	req.on('end', function(){

		var dataType = data.substring( 0, data.indexOf( "base64," ) + 7 );
		var dataURL = data.replace( dataType, '' );

		// console.log( q._storage_key )
		if( !q._storage_key )
		{
			var _storage_key = req.connection.remoteAddress + "_" + req.connection.remotePort + "_" + Date.now();

			_storage[ _storage_key ] = {};
			_storage[ _storage_key ].fileNm = q.fileNm;
			_storage[ _storage_key ].id = q.file_id;
			_storage[ _storage_key ].saved_fileNm = Date.now() + "_" + q.fileNm;
			_storage[ _storage_key ].totalBytes = q.totalBytes;
			//_storage[ _storage_key ].total_offset = q.total_offset;
			//_storage[ _storage_key ].isEnd = 0
			_storage[ _storage_key ]._storage_key = _storage_key
			// _storage[ _storage_key ].ws = global.REQUIRES.fs.createWriteStream( uploadPath + _storage[ _storage_key ].saved_fileNm );
			// _storage[ _storage_key ].ws.on( "finish",function(){ console.log("finish"); /*debugger;*/ } )
			// _storage[ _storage_key ].ws.on( "close",function(){ console.log("close"); /*debugger;*/ } )

		}
		var buffer = new Buffer( dataURL ,"base64");

		//file_stream_write( req,res,_storage_key,buffer )
		if( _storage[ _storage_key ] )
		{
			global.REQUIRES.fs.writeFile( uploadPath + _storage[ _storage_key ].saved_fileNm, buffer,"binary", function(){
				global.api.Response.res_200_ok_String( req, res, JSON.stringify( _storage[ _storage_key ] ) )
				delete _storage[ _storage_key ];
			})
		}
	})



}
