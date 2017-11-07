global.ROUTER.api.Member.session_check = function( req, res ){

	var	_d = decodeURIComponent( req.url );
	var	_q = _d.split("?")
		_q.shift();
console.log( _q )
	var	_p = global.REQUIRES.querystring.parse(	_q.join("") )
	console.log( _p );
		//_p.sid = global.api.Session.session( _q.id );

	//	global.api.DB.query_excute( _q, 'D:/global.ROUTER.api.Member.login.dbjs',function(r){
	//		//console.log( r )
	//
	//		if( r != 0 )
	//		{
	//			global.api.Response.res_200_ok_String( req, res, global.api.Session.session( r ) )
	//		}
	//
	//	})

	var r = global.REQUIRES.redis.createClient(global.REDIS.CONFIG.port, global.REDIS.CONFIG.connect_url);
		r.auth( global.REDIS.CONFIG.pass );
	// for(var i = 0;i < 100000; ++i)
	// {
	//   //r.set(i, "test" + i, 'EX', 10);
	//   r.set(i, "test" + i, 'EX', 60*60);
	//   // var todayEnd = new Date().setHours(0, 0, 30, 999);
	// }
	console.log( _p.sid )
	r.get(_p.sid, function(err, data){
	                       console.log(data);
						   global.api.Response.res_200_ok_String( req, res, JSON.stringify( data ))
	               });

	//r.set( _p.sid, JSON.stringify( doc ), 'EX', 15*60)
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

	// global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {
	// 	global.CSJLog.log("Connected correctly to server");
	//
	// 	//------------------------------;
	// 	var db0 = db.db('member')
	//
	// 	db0.collection("member_basic").find({ id : _p.id,pwd : _p.pwd}).limit(1).next(function(err, doc){
	//
	// 		if( doc )
	// 		{
	// 			db0.collection("member_basic").updateOne({ id :_p.id }, {$set:{ sid : _p.sid }});
	// 			doc.sid = _p.sid
	// 		}
	//
	// 		db.close();
	//
	// 		global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
	//
	// 	//------------------------------;
	//
	// 	});
	// });
};
