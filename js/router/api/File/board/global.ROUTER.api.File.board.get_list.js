global.ROUTER.api.File.board.get_list = function( req, res ){

	var	_q = global.REQUIRES.querystring.parse(	global.REQUIRES.url.parse( decodeURIComponent(	req.url ) ).query );
	
	global.CSJLog.timeStamp( JSON.stringify( _q ) );
	
	global.api.Session.session_check(req, res, _q.sid, function( result ){

		if( result == 0 )
		{
			global.api.Response.res_200_ok_String( req, res, result.toString());

		}
		else
		{
			global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {

				global.CSJLog.timeStamp("Connected correctly to server");
				//------------------------------;

				var db0 = db.db('file');
				var _query = { _d : { $ne : 0},cd$doc : _q.cd$doc }
				db0.collection("board").find(_query).sort({ _id : -1 }).toArray(function(err, doc){
						global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
						db.close();
				});

				//------------------------------;

			});
		}
	})
};
