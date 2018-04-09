var _storage = {};

/**
 * [description]
 * @param  {[type]}	req	[description]
 * @param  {[type]}	res	[description]
 * @param  {[type]}	d	[description]
 * @return {[type]}		[description]
 */
global.ROUTER.api.File.common.file_upload__single_readAsArrayBuffer = function( req, res, d ){
	console.log( req )
	var	_q = decodeURIComponent(req.url).split('?')[ 1 ];
	var	q =	global.REQUIRES.querystring.parse( _q );
	var	uploadPath =  global.ROOTPath +	"/upload/"

	var	_datas = {};

	//Target Buffer;
	var	tb;

	req.on('data', function( chunk ){
		req;
		var	len	= Number( req.headers[ "content-length"	] );

		if(	!_datas[ len ] )
		{
			_datas[	len	] =	{ b	: new Buffer( len ), i : 0 };
		}

		//Target Buffer;
		tb = _datas[ len ];

		try
		{
			//var i=0, iLen=chunk.length;
			var	i=0, iLen=chunk.byteLength;
			for( ; i<iLen; ++i )
			{
				tb.b.writeUInt8( chunk[	i ], tb.i );
				++tb.i;
			}
		}
		catch( e )
		{
			debugger;
		}
	});

	req.on('end', function(){

		var	target = _storage[ q._storage_key ];

		//if( !q._storage_key )
		if(	!_storage[ q._storage_key ]	)
		{
			var	nowDate	= Date.now();
			//_storage_key = req.connection.remoteAddress +	"_"	+ req.connection.remotePort	+ "_" +	nowDate;

			target = _storage[ q._storage_key ]	= {};

			target._storage_key	= q._storage_key;
			target.datetime = q.datetime;
			target.fileNm =	q.fileNm;
			target.id =	q.file_id;
			target.isEnd = 0;
			target.saved_fileNm	= nowDate +	"_"	+ q.fileNm;
			target.total_offset	= q.total_offset;
			target.totalBytes =	q.totalBytes;

			target.ws =	global.REQUIRES.fs.createWriteStream( uploadPath + target.saved_fileNm );
			target.ws.on( "finish",	function( e	){
				console.log( "finish" );
				if(	e )	console.log( e );
			});
			target.ws.on( "close", function( e ){
				console.log( "close" );
				if(	e )	console.log( e );
			});
			target.ws.on( "error", function( e ){
				console.log( "error" );
				if(	e )	console.log( e );

				//error	response api 작성해야함
				// global.b2link.response.send_200_False__ErrorLog(	req, res, q, e );
			});
		}

		target.offset =	q.offset;

		if(	q.total_offset == q.offset )
		{
			global.CSJLog.timeStamp( "File Upload Complete"	);
			target.isEnd = 1;
		}

		if(	target )
		{
			//target.ws.write( buffer );
			target.ws.write( tb.b, function( error ){
				if(	error )
				{
					debugger;
					return;
				}
				//_data.byteLength = 0;
				//_data.length = 0;
				//_data	= null;
			});

			global.api.Response.res_200_ok_String( req,	res, JSON.stringify( target	) );
			if(	1 == target.isEnd )
			{
				target.ws.end();
				delete _storage[ q._storage_key	];
			}
		}
	})

}
