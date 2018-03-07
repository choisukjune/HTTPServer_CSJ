global.ROUTER.api.Board.delete= function( req, res ){

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

				//ToDo function 으로 분리하기;
				var Long = require('mongodb').Long;

				var d = new Date();
				var r = [
					Long( d.getFullYear() ).toInt()
					, Long( d.getMonth() + 1 ).toInt()
					, Long( d.getDate() ).toInt()
					, Long( d.getHours() ).toInt()
					, Long( d.getMinutes() ).toInt()
					, Long( d.getSeconds() ).toInt()
				];

				var _query = { _id : Long( _q._id ).toInt() };
				var doc = { $set : {_d : Long( 1 ).toInt() },delete_date : r };

				db0.collection("notice").update(_query,doc,function(err, result){
					if (err) throw err;
					console.log( result );
					global.api.Response.res_200_ok_String( req, res, "true");
					db.close();
				});

				//------------------------------;

			});
		}
	})
};
