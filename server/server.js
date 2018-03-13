//--------------------------------------------------------------------------------;
// SERVER;
//--------------------------------------------------------------------------------;

//------------------------------;

global.REQUIRES = {};

//------------------------------;

global.REQUIRES.http = require('http');
global.REQUIRES.url = require('url');
global.REQUIRES.fs = require('fs');
global.REQUIRES.querystring = require('querystring')
global.REQUIRES.iconv = require('iconv-lite')
global.REQUIRES.child_process = require('child_process');
global.REQUIRES.uglify = require("uglify-js");
global.REQUIRES.redis = require("redis");
global.REQUIRES.websocket = require("websocket").server;

//------------------------------;

global.SERVER = {};

//--------------------;
// FUNCTION;
//--------------------;
global.SERVER.make_navi_resource = function(){

	var make_resource = function( r ){

		var file = "./public/html/thtml/navi.thtml";
		var file1 = "./public/html/include/navi.html";

		var b0 = global.REQUIRES.fs.readFileSync( file, 'utf8' );
		var b1 = b0.replace("<!=data=!>", r)
		global.REQUIRES.fs.writeFileSync( file1, b1 ,{ flag : "w" } );

	}
	var path = "./js/router/web/";
	var a0 = global.REQUIRES.fs.readdirSync( path );

	var i = 0,iLen = a0.length;
	var io, r = "";
	for(; i < iLen; ++i )
	{
		io = a0[ i ]
		if( io[ 0 ] != "_" )
		{
			var a1 = global.REQUIRES.fs.readdirSync( path + io );
			//console.log( a1 )
			var j = 0, jLen = a1.length;
			var jo;
			for(; j < jLen; ++j )
			{
				jo = a1[ j ].split(".")
				jo.pop()
				var jo1 = jo[ jo.length - 1 ]
				var jo2 = jo[ jo.length - 2 ]
				var ttt = '<a class="item line_height_small" href="/' + jo2 + "/" + jo1 +'">' + jo1 + '</a>' + "\n"
				r += ttt;
			}
		}
	}
	make_resource( r )
};


global.SERVER.Initialize_commonJS = function(){

    var path = "./public/js/_define/";
    var path0 = "./public/js/common/"
    var a0 = global.REQUIRES.fs.readdirSync( path );
    var ws = global.REQUIRES.fs.createWriteStream( path0 + 'common.min.js' );

    ws.on("finish",function(){ /*console.log( 'finish' );*/})
    ws.on("close",function(){ /*console.log( 'close' );*/ })

    var i =0,iLen = a0.length;
    for( ; i < iLen; ++i )
    {
        console.log( "-[S]- Initialize_commonJS -- " + path + a0[ i ]);
        var r = global.REQUIRES.fs.readFileSync(path + a0[ i ],'utf8');

        //*/
        ws.write( global.REQUIRES.uglify.minify( r ).code,{ flag : "w" });
        /*/
        ws.write( r,{ flag : "w" });
        //*/

        console.log( "-[E]- Initialize_commonJS -- " + path + a0[ i ] );
    }
    ws.end();
};

global.SERVER.Initialize_api = function(){

    var path = global.ROOTPath + "/js/api/";
    var path___define = global.ROOTPath + "/js/api/__define/"

    var a2 = global.REQUIRES.fs.readdirSync( path___define );

    var k = 0,kLen = a2.length;
    var ko;
    for( ; k < kLen; ++k )
    {
        ko = a2[ k ]
        console.log( "-[S]- Initialize_api -- " + path___define + ko );
        var t = global.REQUIRES.fs.readFileSync( path___define + ko,"utf8");
        var e = function( name ){ return eval( name ) }
        e( t );
        console.log( "-[E]- Initialize_api -- " + path___define + ko );
    }


    var a0 = global.REQUIRES.fs.readdirSync( path ).sort();
    //debugger;
    a0.pop();

    var i =0,iLen = a0.length;
    var io,a1;
    for( ; i < iLen; ++i )
    {
        io = a0[ i ];
        a1 = global.REQUIRES.fs.readdirSync( path + a0[ i ] );
        //debugger;
        var j = 0
        for( ; j < a1.length; ++j )
        {
            console.log( "-[S]- Initialize_api -- " + path + a0[ i ] + "/" + a1[ j ] );
            var t = global.REQUIRES.fs.readFileSync( path + a0[ i ] + "/" + a1[ j ],"utf8");
            //debugger;
            var e = function( name ){ return eval( name ) }
            e( t );
            console.log( "-[E]- Initialize_api -- " + path + a0[ i ] + "/" + a1[ j ] );
        }
    }
};

global.SERVER.serverStart = function( routerControl ) {

    global.SERVER.Initialize_commonJS();
    global.SERVER.Initialize_api();
    // global.ROUTER.Initialize_router();
    global.ROUTER.Initialize_router( "web" )
    global.ROUTER.Initialize_router( "api" )
	global.SERVER.make_navi_resource();

    //------------------------------ Logger Regist - Logic;

    global.api.Log.regist_logger( "CSJLog" );
    global.api.Log.regist_logger( "_Someone" );

    //------------------------------ Logger Test CODE;

    var onRequest = function(req, res){
if (req.method == 'OPTIONS') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		res.end();
	}
//	res.setHeader("Access-Control-Allow-Origin", "/*");
//    res.setHeader("Access-Control-Allow-Credentials", "true");
//    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		routerControl( req, res );
		};
	global.server = global.REQUIRES.http.createServer( onRequest ).listen(8888);
    global.CSJLog.timeStamp('server has started.');


	global.ws = new global.REQUIRES.websocket({
		httpServer : global.server
	})


	global.ws.clients = [];

	// WebSocket server
	global.ws.on('request', function(request) {
		global.CSJLog.timeStamp('WebSocket Connection from origin ' + request.origin );
		var connection = request.accept(null, request.origin);
		global.ws.clients.push( connection );
		// This is the most important callback for us, we'll handle
		// all messages from users here.
		connection.on('message', function(message) {
			if (message.type === 'utf8') {
			// process WebSocket message
			 	//connection.sendUTF( JSON.stringify( message ) )
				console.log( message );

				var i = 0,iLen = global.ws.clients.length,io
				for(;i<iLen; ++i)
				{
					io = global.ws.clients[ i ];
					io.sendUTF( JSON.stringify( message ) )
				}

			}
		});

		connection.on('close', function(connection) {
		// close user connection
		});
	});
};
