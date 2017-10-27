global.ROUTER.api.Member.google_auth2 = function( req, res ){

	var	_d = decodeURIComponent( req.url );
	var	_q = _d.split("?")
		_q.shift();


	var	_p = global.REQUIRES.querystring.parse(	_q.join("") )
	var _po = JSON.parse( _p.data );

	//	global.api.DB.query_excute( _q, 'D:/global.ROUTER.api.Member.login.dbjs',function(r){
	//		//console.log( r )
	//
	//		if( r != 0 )
	//		{
	//			global.api.Response.res_200_ok_String( req, res, global.api.Session.session( r ) )
	//		}
	//
	//	})
	//global.api.Response.res_200_ok_String( req, res, JSON.stringify( _q ) );
	global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {
		global.CSJLog.log("Connected correctly to server");

		//------------------------------;
		var db0 = db.db('member')
		var r = 0
		db0.collection("member_oauth_google").find({ "userinfo.emails" : { $elemMatch : { value : _po.userinfo.emails[0].value }}}).limit(1).next(function(err, doc){
			if( doc )
			{
				console.log("데이터가 존재함")

				console.log('update 해야함.')
				db0.collection("member_oauth_google").updateOne({ id :_p.id },{$set: doc});
				db0.collection("member_session").updateOne({ id :_po.userinfo.emails[0].value },{$set: { sid : _po.session_state }});
				global.api.Response.res_200_ok_String( req, res, JSON.stringify( _po ));
			}
			else
			{
				db0.collection("member_oauth_google").find({}).sort({ "_id" : -1}).toArray(function(err, doc ){
					console.log(doc)
					if( doc.length == 0 ){
						var idx = 0
					}else{
						var idx = doc[ 0 ]._id + 1
					}

					_po._id = idx;
					db0.collection("member_oauth_google").insert( _po )

					var data_session = {
						_id : idx
						, id : _po.userinfo.emails[0].value
						, sid : _po.session_state
					}

					db0.collection("member_session").insert( data_session );

					r = 1
					db.close();
				global.api.Response.res_200_ok_String( req, res, JSON.stringify( _po ) );
				})
			}
		//------------------------------;
		});
	});
};


/*
"{
	//"state":"try_sample_request"
	,"access_token":"ya29.GlzvBM1k52mSEzyK2CvJMEU-BjfSc7T1D7dJXDysN8MOew-sW-EMZPbwZWBMLOJUEqOtwhiNMryoPNEjp9GSzRRAywbkbdleQqBFleVGUooJTQZsiZDE4-2C3lX4bg"
	,"token_type":"Bearer"
	,"expires_in":"3600"
	,"scope":"https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.circles.members.read https://www.googleapis.com/auth/plus.login http://www.google.com/m8/feeds/ https://www.googleapis.com/auth/plus.profile.agerange.read https://www.googleapis.com/auth/plus.profile.language.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://mail.google.com/ https://www.googleapis.com/auth/plus.moments.write"
	,"authuser":"0"
	,"hd":"b2link.co.kr"
	,"session_state":"b9c349ea49750df0829cf8dc672b9b3d071df096..0d1e"
	,"prompt":"none"
	,"uerinfo":{
		"kind":"plus#person"
		,"etag":"\"Sh4n9u6EtD24TM0RmWv7jTXojqc/ZrFI1FhTD4IQpP8e5IFZ872XVtU\""
		,"gender":"male"
		,"emails":[
			{"value":"jun@b2link.co.kr","type":"account"}
		]
		,"objectType":"person"
		,"id":"101042294300396860652"
		,"displayName":"최석준"
		,"name":{"familyName":"최","givenName":"석준"}
		,"url":"https://plus.google.com/101042294300396860652"
		,"image":{"url":"https://lh3.googleusercontent.com/-1aNund64jgE/AAAAAAAAAAI/AAAAAAAAAAA/GbDf_VB33g4/photo.jpgsz=50","isDefault":true}
		,"isPlusUser":true
		,"language":"ko"
		,"ageRange":{"min":21}
		,"circledByCount":0
		,"verified":false
		,"domain":"b2link.co.kr"
	}
}"

*/