global.api.DB_console.console_excute_command_js = function( dbjs, _cbFunction ){

	var db_excute_command = [ global.DB.Info.MongoDBServerURL, '-u', global.DB.Info.ID, '-p', global.DB.Info.PASS ];
// global.DB.Info.mongoPath,
	db_excute_command.push( dbjs );
	global.CSJLog.timeStamp( "Command : " + db_excute_command.join(" ") );
	var _exec = global.REQUIRES.child_process.spawnSync( 'mongo', db_excute_command );
	var _tmp = _exec.stdout.toString('utf8')//.split("\n")
	var r = _tmp//.slice(3, _tmp.length - 2).join("").replace(/\t/g, "").replace(/ : /g, ":")

	global.CSJLog.timeStamp( "Result : OK")
	_cbFunction( r );
};
