global.ROUTER.api.Board.write = function( req, res ){

	var	body = '';
	req.on('data', function	(data) {
		body +=	data;
	   // global.CSJLog.timeStamp("Partial body: " + body);
	})
	req.on('end', function () {

		console.log( body )
		var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	body ).replace(/^.*\?/, '') );

		console.log( _q )
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

					db0.collection("notice").insert(doc,function(err, doc){

						global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
						db.close();

					});

					//------------------------------;

				});
			}
		})
	})
};
