global.ROUTER.api.Category.notebook.get_list = function( req, res ){

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

				var db0 = db.db('category');
				var _query = { _d : { $ne : 0},cd$project : _q.cd$project }
				db0.collection("notebook").find(_query).sort({ _id : -1 }).toArray(function(err, doc){
					global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
					db.close();
				});

				//------------------------------;

			});
		}
	})
};
