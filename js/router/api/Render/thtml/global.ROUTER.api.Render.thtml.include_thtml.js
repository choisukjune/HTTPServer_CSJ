global.ROUTER.api.Render.thtml.include_thtml= function( req, res ){

	var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	req.url ).replace(/^.*\?/, '') );

	global.api.Session.session_check(req, res, _q.sid, function( result ){

		if( result == 0 )
		{
			global.api.Response.res_200_ok_String( req, res, result.toString());

		}
		else
		{
				//------------------------------;


				var _path = global.ROUTER.api.Render.PATH.CONFIG._path;

				var d = global.REQUIRES.fs.readFileSync( _path + _q.fileNm, "utf8")

				global.api.Response.res_200_ok_String( req, res, d);


				//------------------------------;
		}
	})
};
