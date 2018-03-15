global.ROUTER.api.Chat.board.get_list = function( req, res ){

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

				var db0 = db.db('chat');
				var _query = { _d : { $ne : 0},cd$doc : _q.cd$doc }
				console.log( _q.cd$notebook )
				db0.collection("board").find(_query).sort({ _id : -1 }).toArray(function(err, doc){
					global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
					db.close();
				});

				//------------------------------;

			});
		}
	})
};
