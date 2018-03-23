global.ROUTER.api.Todo.board.write = function( req, res ){

		var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	req.url ).replace(/^.*\?/, '') );
		console.log( _q )

		var d = JSON.parse( _q.data );
console.log( d )
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
						, bDone : Long( 0 ).toInt()
						, member : {
							_id : -1
							, mid : d.mid
							, nm : ""
							, image : ""
						}
						, cd : ""
						, cd$project : d.cd$project
						, cd$notebook : d.cd$notebook
						, cd$doc : d.cd$doc
						, cd$tag : d.cd$tag
						, title : d.title
						, content : d.content
						, regist_date : r
						, delete_date : null
					}

					//------------------------------;
					var db0 = db.db('todo');
					var db1 = db.db('member');

					db0.collection("board").find({}).sort({_id : -1}).limit(1).toArray(function(err,result){


						if( result.length == 0 ) var idx = 0
						else var idx = result[ 0 ]._id + 1

						doc._id = Long( idx ).toInt()

						db0.collection("board").count({ cd$doc : d.cd$doc },function(err,count){

							doc.cd = _q.cd$doc + "-TODO" + count;
							db1.collection("member_basic").find({id : d.mid}).toArray(function(err,result){
								if( err ) console.log( err )

								/*
								{
									"_id" : 0,
									"id" : "csj6311@naver.com",
									"pwd" : "a",
									"first_Nm" : "Choi",
									"last_Nm" : "Sukjune",
									"sid" : "655d451b83494e91b269506c87087bb5f1e4c7f0cc206fb114dcc63f8371fd4d"
								}
								*/

								var member_info = result[ 0 ];
								console.log( member_info )
								doc.member._id = Long( member_info._id ).toInt();
								doc.member.nm = member_info.first_Nm + " " + member_info.last_Nm;
								doc.member.image = member_info.image;

								db0.collection("board").insert(doc,function(err, result){
									global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ));
									db.close();
								});
							});
						});
					});
					//------------------------------;
				});
			}
		})
	};
