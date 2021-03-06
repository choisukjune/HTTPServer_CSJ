global.ROUTER.api.Category.project.write = function( req, res ){

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
					db0.collection("project").find({}).sort({_id : -1}).limit(1).toArray(function(err,doc){

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

						if( doc.length == 0 ) var idx = 0
						else var idx = doc[ 0 ]._id + 1

						var doc = {
							_id : idx
							, _d : Long( 1 ).toInt()
							, cd : "PRJ" + idx
						    , nm : _q.project_nm
						    , description : _q.project_desc
							, regist_date : r
							, modify_date : null
							, delete_date : null
						}

						db0.collection("project").insert(doc,function( err, result ){
							global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
							db.close();
						});
					});
					//------------------------------;

				});
			}
		})
	};
