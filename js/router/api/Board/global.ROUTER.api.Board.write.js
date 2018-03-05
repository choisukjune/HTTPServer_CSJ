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

					var idx = db0.collection("notice").find({}).limit(1).sort({_id : -1}).limit(1).toArray()[0]._id;
					console.log( idx )

					var doc = {
						_id : idx + 1,
						title : _q.title,
						content : _q.content,
						regist_date : [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
						modify_date : [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
						delete_date : [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
					}

					db0.collection("notice").insert(doc,function(d){

						global.api.Response.res_200_ok_String( req, res, JSON.stringify( d ));
						db.close();

					});

					//------------------------------;

				});
			}
		})
	})
};
