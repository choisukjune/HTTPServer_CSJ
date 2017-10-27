/**
* '_'로 시작되는 폴더를 제외한 파일리스트 전달하는 함수
* @param {String} path
* @return {Array} a
*/
global.api.File.readdirSync__except_underscore_dir = function( path )
{
	var a = []
	var r = global.REQUIRES.fs.readdirSync( path );

	var i = 0,iLen = r.length;
	var io;
	for( ; i < iLen; ++i )
	{
		io = r[ i ];
		if( io[0] != "_" )
		{
			a.push( io );
		}
	}

	return a;
}