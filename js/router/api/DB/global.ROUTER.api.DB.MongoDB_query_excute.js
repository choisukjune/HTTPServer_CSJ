global.ROUTER.api.DB.MongoDB_query_excute = function(req, res ){

	var	q = decodeURIComponent(req.url).split('?')[ 1 ];
	var	_q =	global.REQUIRES.querystring.parse( q );

	var _d = global.ROOTPath + "/dbjs/" + _q.path;

	global.api.DB_console.console_excute_command_js( _d, function(r){

		global.api.Response.res_200_ok_String( req, res, r )
	})
}