global.ROUTER.api.Member.sign_up = function( req, res ){

	var	_d = decodeURIComponent( req.url );
	var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	req.url ).replace(/^.*\?/, '') )

	global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {
		global.CSJLog.log("Connected correctly to server");

		//------------------------------;
		var db0 = db.db('member')
		var r = 0
		db0.collection("member_basic").find({ id : _q.email,pwd : _q.pwd}).limit(1).next(function(err, doc){

			if( doc )
			{
				console.log("데이터가 존재함")
				global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
			}
			else
			{

				db0.collection("member_basic").find({}).sort({ "_id" : -1}).toArray(function(err, doc ){
					console.log(doc)
					if( doc.length == 0 ){
						var idx = 0
					}else{
						var idx = doc[ 0 ]._id + 1

					}
					var data = {
						_id : idx
						, id : _q.email
						, pwd : _q.pwd
						, first_Nm : _q.first_Nm
						, last_Nm : _q.last_Nm
						, sid : ""
					}
					db0.collection("member_basic").insert( data )


					var data_session = {
						_id : idx
						, id : _q.email
						, sid : ""
					}

					db0.collection("member_session").insert( data_session )
					r = 1

						db.close();

				global.api.Response.res_200_ok_String( req, res, r.toString() );


				})

			}


		//------------------------------;

		});
	});
};