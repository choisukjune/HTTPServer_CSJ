global.ROUTER.api.Chat.board.write = function( req, res ){

	var	body = '';
	req.on('data', function	(data) {
		body +=	data;
	   // global.CSJLog.timeStamp("Partial body: " + body);
	})

	req.on('end', function () {

		var	_q = global.REQUIRES.querystring.parse(	decodeURIComponent(	body ).replace(/^.*\?/, '') );

		global.api.Session.session_check(req, res, _q.sid, function( result ){

			if( result == 0 )
			{
				global.api.Response.res_200_ok_String( req, res, result.toString());

			}
			else
			{
				global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {

					//ToDo function 으로 분리하기;
					var tagsToReplace = {
					    '"': '&quot;',
					    '&': '&amp;',
					    '<': '&lt;',
					    '>': '&gt;',
					    "'": '&#039;'
					};

					function replaceTag(tag) {
					    var s = tagsToReplace[tag] || tag;
					    return s;
					}

					function safe_tags_replace(str) {
					    return str.replace(/[&<>\"\'\{\}]/g, replaceTag);
					}

					global.CSJLog.log("Connected correctly to server");

					//ToDo function 으로 분리하기;
					var Long = require('mongodb').Long;

					var d = new Date();
					var r = [ Long( d.getFullYear() ).toInt(), Long( d.getMonth() + 1 ).toInt(), Long( d.getDate() ).toInt(), Long( d.getHours() ).toInt(), Long( d.getMinutes() ).toInt(), Long( d.getSeconds() ).toInt() ];

					var doc = {
						_id : -1
						, _d : Long( 1 ).toInt()
						, member : {
							_id : -1
							, mid : _q.mid
							, nm : ""
							, image : ""
						}
						, cd : ""
						, cd$project : _q.cd$project
						, cd$notebook : _q.cd$notebook
						, cd$doc : _q.cd$doc
						, content : _q.content
						, regist_date : r
						, delete_date : null
					}

					var db0 = db.db('chat');
					var db1 = db.db('member');

					db0.collection("board").find({}).sort({_id : -1}).limit(1).toArray(function(err,result){

						if( result.length == 0 ) var idx = 0
						else var idx = result[ 0 ]._id + 1
						doc._id = idx;

						db0.collection("board").count({ cd$notebook : _q.cd$notebook },function(err,result){

							var doc_idx = result;
							doc.cd = _q.cd$doc + "-CHAT" + doc_idx;
							db1.collection("member_basic").find({mid : _q.mid}).toArray(function(result){
								
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
								doc.member._id = Long( member_info._id ).toInt();
								doc.member._nm = member_info.first_Nm + " " + member_info.last_Nm;
								doc.member.image = "https://semantic-ui.com/images/avatar/small/joe.jpg"

								db0.collection("board").insert(doc,function(d){
									global.api.Response.res_200_ok_String( req, res, JSON.stringify( doc ) );
									db.close();
								});
							});
						})
					});
				});
			}
		})
	})
};
