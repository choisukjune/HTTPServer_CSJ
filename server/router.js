//--------------------------------------------------------------------------------;
// ROUTER;
//--------------------------------------------------------------------------------;


//router;
global.ROUTER =	{};
global.ROUTER.CONST	= {};
global.ROUTER.CONST.CONFIG ={};

//------------------------------ ROUTER	Config;

var	_web = "/js/router/web/";
var	_api = "/js/router/api/";

var	_ =	global.ROUTER.CONST.CONFIG ;
	_.__defineGetter__(	"web", function(){ return _web;	} );
	_.__defineGetter__(	"api", function(){ return _api;	} );

//------------------------------ ROUTER	Config;
//------------------------------ ROUTER	CONTENTTYPES;
global.ROUTER.CONST.CONTENTTYPES = {
	'aac': 'audio/aac',
	'ai': 'application/postscript',
	'appcache': 'text/cache-manifest',
	'avi': 'video/avi',
	'bin': 'application/octet-stream',
	'bmp': 'image/bmp',
	'coffee': 'text/coffeescript',
	'css': 'text/css',
	'csv': 'text/csv',
	'doc': 'application/msword',
	'docx': 'application/msword',
	'dtd': 'application/xml-dtd',
	'eps': 'application/postscript',
	'exe': 'application/octet-stream',
	'flac': 'audio/x-flac',
	'geojson': 'application/json',
	'gif': 'image/gif',
	'gzip': 'application/x-gzip',
	'htm': 'text/html',
	'html': 'text/html',
	'ico': 'image/x-icon',
	'ics': 'text/calendar',
	'ifb': 'text/calendar',
	'jpe': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'jpg': 'image/jpeg',
	'js': 'text/javascript',
	'json': 'application/json',
	'jsx': 'text/jsx',
	'less': 'text/css',
	'm4a': 'audio/mp4a-latm',
	'm4v': 'video/x-m4v',
	'manifest': 'text/cache-manifest',
	'md': 'text/x-markdown',
	'mid': 'audio/midi',
	'midi': 'audio/midi',
	'mov': 'video/quicktime',
	'mp3': 'audio/mpeg',
	'mp4': 'video/mp4',
	'mpe': 'video/mpeg',
	'mpeg': 'video/mpeg',
	'mpg': 'video/mpeg',
	'mpga': 'audio/mpeg',
	'mtl': 'text/plain',
	'mv4': 'video/mv4',
	'obj': 'text/plain',
	'ogg': 'application/ogg',
	'ogv': 'video/ogg',
	'package': 'text/plain',
	'pdf': 'application/pdf',
	'png': 'image/png',
	'ppt': 'application/vnd.ms-powerpoint',
	'pptx': 'application/vnd.ms-powerpoint',
	'ps': 'application/postscript',
	'rar': 'application/x-rar-compressed',
	'rtf': 'text/rtf',
	'sass': 'text/css',
	'scss': 'text/css',
	'sh': 'application/x-sh',
	'stl': 'application/sla',
	'svg': 'image/svg+xml',
	'swf': 'application/x-shockwave-flash',
	'tar': 'application/x-tar',
	'tif': 'image/tiff',
	'tiff': 'image/tiff',
	'txt': 'text/plain',
	'tsv' : 'text/tab-separated-values',
	'wav': 'audio/x-wav',
	'webm': 'video/webm',
	'webp': 'image/webp',
	'woff': 'application/font-woff',
	'woff2': 'application/font-woff2',
	'xht': 'application/xhtml+xml',
	'xhtml': 'application/xhtml+xml',
	'xls': 'application/vnd.ms-excel',
	'xlsx': 'application/vnd.ms-excel',
	'xml': 'application/xml',
	'xpm': 'image/x-xpixmap',
	'xsl': 'application/xml',
	'xslt': 'application/xslt+xml',
	'zip': 'application/zip',
	'ico' : 'image/x-icon'
};
//------------------------------ ROUTER	CONTENTTYPES;

global.ROUTER.INFO = {};

global.ROUTER.Initialize_router	= function(	param ){

	var path = global.ROOTPath + global.ROUTER.CONST.CONFIG[ param ];
	var path___define_web = global.ROOTPath + "/js/router/web/__define/"
	var path___define_api = global.ROOTPath + "/js/router/api/__define/"

	var a0 = global.api.File.readdirSync__except_underscore_dir( path );
	var a2 = global.REQUIRES.fs.readdirSync( path___define_web );
	var a3 = global.REQUIRES.fs.readdirSync( path___define_api );

	//console.log( a0 )

	var t,s;
	var	e =	function( name ){ return eval( name	) }

	if(	"web" == param )
	{
		var k = 0,kLen = a2.length;
	    var ko;
	    for( ; k < kLen; ++k )
	    {
	        ko = a2[ k ]
	        console.log( "-[S]- Initialize_router_web__define -- " + path___define_web + ko );
	        t = global.REQUIRES.fs.readFileSync( path___define_web + ko,"utf8");
	        e( t );
	        console.log( "-[E]- Initialize_router_web__define -- " + path___define_web + ko );
	    }

		t =	global.REQUIRES.fs.readFileSync( global.ROOTPath + "/js/router/web/Common/global.ROUTER.web.Common.index.js","utf8");
		global.ROUTER.INFO[ "/" ] = e( t );

		var	i =0,iLen =	a0.length,_temp,routerNm;
		var a1;
		for( ; i < iLen; ++i )
		{
			a1 = global.api.File.readdirSync__except_underscore_dir( path + '/' + a0[ i ] );
			var j = 0,jLen = a1.length;
			for(; j < jLen; ++j )
			{
				console.log( "-[S]- Initialize_router_" + param + "-- " + path + '/' + a0[ i ] + '/' + a1[ j ] );

				_temp =	a1[	j ].split(".")
				_temp.pop();
				_temp = _temp.pop();

				routerNm = "/" + a0[ i ] + "/" + _temp;
				//*/
				// 화면을 그리는 용도로만 사용되므로 라우터가따로 존재할 필요없음;
				t =	global.REQUIRES.fs.readFileSync(path + '/' + a0[ i ] + '/' + a1[ j ],"utf8");
				//console.log( t )
				//console.log(global.ROUTER.INFO )
				//t = global.REQUIRES.fs.readFileSync(global.ROOTPath + "/js/api/HTML/global.api.HTML.render_html.js","utf8");
				global.ROUTER.INFO[	routerNm ] = e( t );

				/*/
				//require 방식 변경;
				//global.ROUTER.INFO[ routerNm ] = require(	path + a0[ i ] );
				//*/
				console.log( "-[E]- Initialize_router_" + param + "-- " + path + '/' + a0[ i ] + '/' + a1[ j ] );
			}
		}
	}

	if( "api" == param )
	{

		var k = 0,kLen = a3.length;
	    var ko,_temp;
	    for( ; k < kLen; ++k )
	    {
	        ko = a3[ k ]
	        console.log( "-[S]- Initialize_router_api__define -- " + path___define_api + ko );
	        t = global.REQUIRES.fs.readFileSync( path___define_api + ko,"utf8");
	        e( t );
	        console.log( "-[E]- Initialize_router_api__define -- " + path___define_api + ko );
	    }

		var	i =0,iLen =	a0.length,_temp,routerNm;
		var a1,a2,a4;
		for( ; i < iLen; ++i )
		{
			a1 = global.api.File.readdirSync__except_underscore_dir( path + '/' + a0[ i ] );
			var j = 0,jLen = a1.length,_define_api;
			for(; j < jLen; ++j )
			{
				a4 = global.api.File.readdirSync__except_underscore_dir( path + '/' + a0[ i ] + '/' + a1[ j ] );

				if( !global.ROUTER.api[ a0[ i ] ].hasOwnProperty( a1[ j ] ) )
				{
					_define_api = "global.ROUTER.api." + a0[ i ] + "." + a1[ j ] + "= {};"
					e( _define_api )
				}

				var z = 0,zLen = a4.length;
				for(;z<zLen; ++z)
				{

					console.log( "-[S]- Initialize_router_" + param + "-- " + path + '/' + a0[ i ] + '/' + a1[ j ] + '/' + a4[ z ] );

					_temp =	a4[	z ].split(".")
					_temp.pop();
					_temp = _temp.pop();

					routerNm = "/" + param + "/" + a0[ i ] + "/" + a1[ j ] + "/" + _temp;

					//*/
					// 화면을 그리는 용도로만 사용되므로 라우터가따로 존재할 필요없음;
					t =	global.REQUIRES.fs.readFileSync(path + '/' + a0[ i ] + '/' + a1[ j ] + '/' + a4[ z ],"utf8");
					//console.log( t )
					//console.log(global.ROUTER.INFO )
					//t = global.REQUIRES.fs.readFileSync(global.ROOTPath + "/js/api/HTML/global.api.HTML.render_html.js","utf8");
					//console.log( routerNm )
					global.ROUTER.INFO[	routerNm ] = e( t );

					/*/
					//require 방식 변경;
					//global.ROUTER.INFO[ routerNm ] = require(	path + a0[ i ] );
					//*/

					console.log( "-[E]- Initialize_router_" + param + "-- " + path + '/' + a0[ i ] + '/' + a1[ j ] + '/' + a4[ z ] );

				}
			}
		}
	}
}

global.ROUTER.routerControl	= function(req,res)	{

	var	pathname = global.REQUIRES.url.parse(req.url).pathname;
	var	extension  = req.url.substring( req.url.lastIndexOf(".") + 1 );

	if( req.url == "/robots.txt") return;

	global.CSJLog.timeStamp( "Request URL : " +  req.url )

	if( !global.ROUTER.INFO.hasOwnProperty( pathname ) )
	{

		if( extension.indexOf("?") != -1 ) extension = extension.split("?")[0];

		var resource_dir = global.ROOTPath + "/public" + pathname

		if( req.url == "/favicon.ico") resource_dir = global.ROOTPath + req.url;

		if( global.ROUTER.CONST.CONTENTTYPES[ extension ] )
		{
			var fileNm = req.url.split('/')
			var	resource = global.REQUIRES.fs.createReadStream(	resource_dir );

			// resource.on('finish', function(){ console.log( "---------- finish ----------" ) });
			// resource.on('close',	function(){	console.log( "---------- close ----------" ); });
			resource.on('end', function(){ res.end(); });

			res.writeHeader(200, { "Content-Type": global.ROUTER.CONST.CONTENTTYPES[ extension ]})
			resource.pipe(res);
			return;
		}
	}

	if ( global.ROUTER.INFO.hasOwnProperty(	pathname ) )
	{
		if(	'GET' == req.method	)
		{
			global.CSJLog.timeStamp( "METHOD : " + req.method );
			global.CSJLog.timeStamp( "Path : " + pathname );
			global.CSJLog.timeStamp("IP : "	+ req.connection.remoteAddress + " | PORT : " +	req.connection.remotePort);
			global.CSJLog.timeStamp("IP : "	+ req.connection.localAddress +	" | PORT : " + req.connection.localPort);

			global.ROUTER.INFO[	pathname ](	req, res, encodeURIComponent( req.url ) )
		}
		else
		{
			global.CSJLog.timeStamp( "METHOD : " + req.method );
			global.CSJLog.timeStamp( "Path : " + pathname );
			global.CSJLog.timeStamp("IP : "	+ req.connection.remoteAddress + " | PORT : " +	req.connection.remotePort);
			global.CSJLog.timeStamp("IP : "	+ req.connection.localAddress +	" | PORT : " + req.connection.localPort);

			global.ROUTER.INFO[	pathname ](	req, res )
		}
	}
	else
	{
		global.CSJLog.timeStamp( 'no request handler found for ' + pathname	);

		res.writeHead(404, {'Content-Type' : 'text/plain'});
		res.write('404 Not found');
		res.end();
	}
}

/*
req.connection.remoteAddress
req.connection.remotePort
req.connection.localAddress
req.connection.localPort
 */
global.ROUTER.GET__req_res = function( req,	res, pathname ){

	global.CSJLog.timeStamp("IP	/ "	+ req.connection.remoteAddress + " | PORT /	" +	req.connection.remotePort);
	global.CSJLog.timeStamp("IP	/ "	+ req.connection.localAddress +	" |	PORT / " + req.connection.localPort);

	global.ROUTER.INFO[	pathname ](	req, res, encodeURIComponent( req.url ), pathname )
};

global.ROUTER.POST__req_res	= function(	req, res, pathname ){

	global.CSJLog.timeStamp("IP	/ "	+ req.connection.remoteAddress + " | PORT /	" +	req.connection.remotePort);
	global.CSJLog.timeStamp("IP	/ "	+ req.connection.localAddress +	" |	PORT / " + req.connection.localPort);

	var	body = '';
	req.on('data', function	(data) {
		body +=	data;
	   // global.CSJLog.timeStamp("Partial body: " + body);
	})
	req.on('end', function () {
	   // global.CSJLog.timeStamp("Body: " + body);
		//req.body = body;
		console.log( pathname )
		global.ROUTER.INFO[	pathname ](	req, res, body,	pathname )
	})
};
