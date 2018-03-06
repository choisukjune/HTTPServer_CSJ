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

					db0.collection("notice").find({}).sort({_id : -1}).limit(1).toArray(function(err,doc){
						console.log(doc)
						var Long = require('mongodb').Long;

						var d = new Date();
						var r = [
							Long.toNumber( d.getFullYear() )
							, Long.toNumber( d.getMonth() + 1 )
							, Long.toNumber( d.getDate() )
							, Long.toNumber( d.getHours() )
							, Long.toNumber( d.getMinutes() )
							, Long.toNumber( d.getSeconds() )
						];


						if( doc.length == 0 ){
							var idx = 0
						}else{
							var idx = doc[ 0 ]._id + 1
						}

						var doc = {
							_id : idx,
							title : _q.title,
							content : _q.data,
							regist_date : r,
							modify_date : [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
							delete_date : [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
						}

						db0.collection("notice").insert(doc,function(d){
							console.log( d )
							global.api.Response.res_200_ok_String( req, res, JSON.stringify( d ) );
							db.close();

						});
					});
					//------------------------------;

				});
			}
		})
	})
};
