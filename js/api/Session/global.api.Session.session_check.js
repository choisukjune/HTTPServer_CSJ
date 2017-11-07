global.api.Session.session_check = function( req, res, sid, _cbFunction ){
console.log( sid );
	var r = 0;

	global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {
		global.CSJLog.log("Connected correctly to server");

		//------------------------------;
		var db0 = db.db('member')

		db0.collection("member_session").find({ sid : sid }).limit(1).next(function(err, doc){

			db.close();
			if( doc ){
				global.CSJLog.log("Sesstion Check -- Success")
				r = 1
				_cbFunction( r )
			}else{
				global.CSJLog.error( "Sesstion Check -- fail" )
//				res.writeHead(301, {
//				'Location': "http" + (req.socket.encrypted ? "s" : "") + "://" +
//				req.headers.host + "/login"
//				});
//				res.end();
				_cbFunction( r )
			}

		});

		//------------------------------;

	});


};



//
