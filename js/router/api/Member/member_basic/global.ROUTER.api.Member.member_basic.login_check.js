global.ROUTER.api.Member.member_basic.login_check = function( req, res ){

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

//	var mongoDB_query_findOne = function( db, dbNm, colNm, query ){
//
//		var a = db0.collection("member_basic").find({ id : _p.id,pwd : _p.pwd}).limit(1).next().toArray()
//		return a[ 0 ];
//
//	}
// global.REDIS.CONFIG.connect_url = '127.0.0.1';
// global.REDIS.CONFIG.port = 6379;
// global.REDIS.CONFIG.pass = 'tjrwns12';


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

				db0.collection("member_session").updateOne({ id :_p.id }, {$set:{ sid : _p.sid }});

				var r = global.REQUIRES.redis.createClient(global.REDIS.CONFIG.port, global.REDIS.CONFIG.connect_url);
					r.auth( global.REDIS.CONFIG.pass );
				// for(var i = 0;i < 100000; ++i)
				// {
				//   //r.set(i, "test" + i, 'EX', 10);
				//   r.set(i, "test" + i, 'EX', 60*60);
				//   // var todayEnd = new Date().setHours(0, 0, 30, 999);
				// }

				r.set( _p.sid, JSON.stringify( doc ), 'EX', 15*60)
				// r.keys('*', function(err, keys){
				//   if(err) return console.log(err);
				//   //for(var i = 0, len = keys.length; i < len; i++) {
				//     console.log("MULTI got " + keys.length + " replies");
				//            keys.forEach( function(reply, index ){
				//                console.log("Reply " + index + ": " + reply.toString());
				//                r.get(reply, function(err, data){
				//                        console.log(data);
				//                });
				//            });
				//   //}
				// });

				r.quit()


			db.close();

			global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));

		//------------------------------;

		});
	});
};
