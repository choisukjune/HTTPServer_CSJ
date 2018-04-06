global.api.Session.session_check = function( req, res, sid, _cbFunction ){

	var r = 0;
	
	var _con = {
		port : global.REDIS.CONFIG.port
		, host : global.REDIS.CONFIG.connect_url
		,db : 2
	}
	//*/
	var r = global.REQUIRES.redis.createClient( _con );
		r.auth( global.REDIS.CONFIG.pass );

		r.get( sid, function(err, data){

			console.log( "===>",data )

			if( err ) global.CSJLog.timeStamp( err )
			if( data == null )
			{
				global.CSJLog.timeStamp( "Session__data - ", "데이터 없음." );
				return _cbFunction( data );
			}
			else
			{
				//global.CSJLog.timeStamp( "sid : " + sid )
				//global.CSJLog.timeStamp( data )
				global.CSJLog.timeStamp( "Session__data - ", data );
				r.quit()
				return _cbFunction( data );
			}
		});



	/*/

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

//*/
};



//
