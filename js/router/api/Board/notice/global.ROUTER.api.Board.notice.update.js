global.ROUTER.api.Board.notice.update = function( req, res ){

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

						var db0 = db.db('board');

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

						var _query = { _id : Long( _q._id ).toInt() };
						var doc = { $set : {title : _q.title, content : _q.data, modify_date : r} };

						console.log( _query )
						console.log( doc )

						db0.collection("notice").update(_query,doc,function(err, result){
							if (err) throw err;
							console.log( result )
							global.api.Response.res_200_ok_String( req, res, JSON.stringify( _q._id ) );
							db.close();
						});
					});
				}
			})
		})

};
