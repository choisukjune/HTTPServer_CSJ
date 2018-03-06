global.ROUTER.api.Board.write = function( req, res ){

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
					db0.collection("notice").find({}).sort({_id : -1}).limit(1).toArray(function(err,doc){

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


						if( doc.length == 0 ) var idx = 0
						else var idx = doc[ 0 ]._id + 1

						var doc = {
							_id : idx
							, _d : Long( -1 ).toInt()
							, title : _q.title
							, content : safe_tags_replace( _q.data )
							, regist_date : r
							, modify_date : null
							, delete_date : null
						}

						db0.collection("notice").insert(doc,function(d){
							global.api.Response.res_200_ok_String( req, res, JSON.stringify( d ) );
							db.close();
						});
					});
				});
			}
		})
	})
};
