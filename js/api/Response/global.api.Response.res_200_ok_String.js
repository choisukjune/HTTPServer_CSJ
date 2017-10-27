global.api.Response.res_200_ok_String = function( req, res, d )
{
	// res.writeHead(200, {'Content-Type': req.headers.accept.split(",")[0]});
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

	//res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
//	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
	global.CSJLog.timeStamp( "res.statusCode / " + res.statusCode );
	global.CSJLog.timeStamp(  "res.statusCode / " + res.statusCode );
	//console.log( "[ " + global.log.dateTime() + " ] -- " + "data / \n" + d )
	res.write( d, 'utf-8');
	res.end();

}