/**
 * [description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @param  {[type]} d   [description]
 * @return {[type]}     [description]
 */
global.ROUTER.api.File.readdir = function( req, res, d ){

	var _q = decodeURIComponent(req.url).split('?')[ 1 ];
	var q = global.REQUIRES.querystring.parse( _q );

	var _tmp = global.REQUIRES.fs.readdirSync( global.ROUTER.api.File.PATH.CONFIG[ q.path ] )
	console.log( _tmp )
	global.api.Response.res_200_ok_String( req, res, JSON.stringify( _tmp )

)}
