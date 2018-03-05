global.ROUTER.api.Common.detail_view_by__id = function( req, res ){

	var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	req.url ).replace(/^.*\?/, '') );
	console.log( _q );
	global.api.Session.session_check(req, res, _q.sid, function( result ){
		console.log( result )
		if( result == 0 )
		{
			global.api.Response.res_200_ok_String( req, res, result.toString());

		}
		else
		{
			global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {

				global.CSJLog.log("Connected correctly to server");

				//------------------------------;
				console.log( _q._id  )
				var db0 = db.db('board');

				db0.collection("notice").find( { _id : _q._id * 1 } ).toArray(function(err, doc){
					console.log( doc)
					global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
					db.close();

				});

				//------------------------------;

			});
		}
	})
};
