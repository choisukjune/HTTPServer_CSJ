global.ROUTER.api.Board.notice.get_list = function( req, res ){

	var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	req.url ).replace(/^.*\?/, '') );
	global.api.Session.session_check(req, res, _q.sid, function( result ){

		if( result == 0 )
		{
			global.api.Response.res_200_ok_String( req, res, result.toString());

		}
		else
		{
			global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {

				global.CSJLog.log("Connected correctly to server");

				//------------------------------;

				var db0 = db.db('board');
				var _query = { _d : { $ne : 0},cd$notebook : _q.cd$notebook }
				console.log( _q.cd$notebook )
				db0.collection("notice").find(_query).sort({ _id : -1 }).toArray(function(err, doc){
					global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
					db.close();
				});

				//------------------------------;

			});
		}
	})
};
