global.ROUTER.api.Member.session_check = function( req, res ){

	var	_d = decodeURIComponent( req.url );
	var	_q = _d.split("?")
		_q.shift();

	var	_p = global.REQUIRES.querystring.parse(	_q.join("") )

		_p.sid = global.api.Session.session( _q.id );

	//	global.api.DB.query_excute( _q, 'D:/global.ROUTER.api.Member.login.dbjs',function(r){
	//		//console.log( r )
	//
	//		if( r != 0 )
	//		{
	//			global.api.Response.res_200_ok_String( req, res, global.api.Session.session( r ) )
	//		}
	//
	//	})

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
};