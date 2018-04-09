global.api.File.board.add_file = function( doc ){

	global.api.REQUIRES.MongoDB.MongoClient.connect(global.DB.CONFIG.driver_connect_url , function(err, db) {

		global.CSJLog.log("Connected correctly to server");

		//ToDo function 으로 분리하기;
		var Long = require('mongodb').Long;

		var d = new Date();
		var r = [ Long( d.getFullYear() ).toInt(), Long( d.getMonth() + 1 ).toInt(), Long( d.getDate() ).toInt(), Long( d.getHours() ).toInt(), Long( d.getMinutes() ).toInt(), Long( d.getSeconds() ).toInt() ];

		var _to = {
			_id : -1
			, _d : Long( 1 ).toInt()
			, member : {
				_id : -1
				, mid : doc.member.mid
				, nm : doc.member.nm
				, image : doc.member.image
			}
			, cd : ""
			, cd$project : doc.cd$project
			, cd$notebook : doc.cd$notebook
			, cd$doc : doc.cd$doc
			, filePath : doc.filePath
			, fileNm : doc.fileNm
			, fileExtend : doc.fileExtend
			, regist_date : r
			, delete_date : null
		}

		var db0 = db.db('file');
		var db1 = db.db('member');

		db0.collection("board").find({}).sort({_id : -1}).limit(1).toArray(function(err,result){

			if( result.length == 0 ) var idx = 0
			else var idx = result[ 0 ]._id + 1
			_to._id = idx;

			db0.collection("board").count({ cd$doc : doc.cd$doc },function(err,result){

				var doc_idx = result;
				_to.cd = doc.cd$doc + "-FILE" + doc_idx;

				db0.collection("board").insert(_to,function(d){
					console.log("file add OK!")
					db.close();
				});
			})
		});
	});
};
