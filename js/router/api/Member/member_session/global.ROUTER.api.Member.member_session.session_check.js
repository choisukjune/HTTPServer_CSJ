global.ROUTER.api.Member.member_session.session_check = function( req, res ){

	var	_d = decodeURIComponent( req.url );
	var	_q = _d.split("?")
		_q.shift();

	var	_p = global.REQUIRES.querystring.parse(	_q.join("") )
	var _con = {
		port : global.REDIS.CONFIG.port
		, host : global.REDIS.CONFIG.connect_url
		,db : 2
	}
	//*/
	var r = global.REQUIRES.redis.createClient( _con );
		r.auth( global.REDIS.CONFIG.pass );
		// global.CSJLog.timeStamp( "Session - ", _p.sid);
		r.get(_p.sid, function(err, data){
			console.log( _p.sid )
			console.log( data )
			//global.CSJLog.timeStamp( "Session__data - ", JSON.stringify( data ));
			global.api.Response.res_200_ok_String( req, res, JSON.stringify( data ))
		});

		r.quit()

	/*/
	_p.sid = global.api.Session.session( _q.id );
	global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {
		global.CSJLog.log("Connected correctly to server");

		//------------------------------;
		var db0 = db.db('member')

		db0.collection("member_basic").find({ id : _p.id,pwd : _p.pwd}).limit(1).next(function(err, doc){

			if( doc )
			{
				db0.collection("member_basic").updateOne({ id :_p.id }, {$set:{ sid : _p.sid }});
				doc.sid = _p.sid
			}

			db.close();

			global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));

		//------------------------------;

		});
	});
	//*/
};
