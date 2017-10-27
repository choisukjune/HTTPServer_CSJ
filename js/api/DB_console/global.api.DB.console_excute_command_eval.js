global.api.DB_console.console_excute_command_eval = function( _q, _cbFunction ){

	var db_excute_command = ['/c', global.DB.Info.mongoPath, global.DB.Info.MongoDBServerURL, '-u', global.DB.Info.ID, '-p', global.DB.Info.PASS, '--eval'];

	db_excute_command.push( _q );

	var _exec = global.REQUIRES.child_process.spawnSync( 'cmd.exe', db_excute_command );
	var r = _exec.stdout.toString('utf8').split("\n").slice(3).join("").replace(/\t/g, "").replace(/ : /g, ":")

	global.CSJLog.timeStamp("Done")
	_cbFunction( r );
};
