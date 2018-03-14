global.ROUTER.api.Category.notebook.write = function( req, res ){

		var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	req.url ).replace(/^.*\?/, '') );
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

					var doc = {
						_id : -1
						, _d : Long( 1 ).toInt()
						, cd : ""
						, nm : _q.notebook_nm
						, cd$project : _q.cd$project
						, nm$project : _q.nm$project
						, description : _q.notebook_desc
						, regist_date : r
						, modify_date : null
						, delete_date : null
					}

					//------------------------------;
					var db0 = db.db('category');
					db0.collection("notebook").find({}).sort({_id : -1}).limit(1).toArray(function(err,result){


						if( result.length == 0 ) var idx = 0
						else var idx = result[ 0 ]._id + 1

						doc._id = Long( idx ).toInt()

						db0.collection("notebook").count({ cd$project : _q.cd$project },function(err,count){

							doc.cd = _q.cd$project + "-NOTE" + count;

							db0.collection("notebook").insert(doc,function(err, result){
								console.log( result )
								global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
								db.close();
							});
						});
					});
					//------------------------------;

				});
			}
		})
	};
