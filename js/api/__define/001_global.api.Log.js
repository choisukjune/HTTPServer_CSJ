//--------------------------------------------------------------------------------;
// LOG;
//--------------------------------------------------------------------------------;


/*
    Reset = "\x1b[0m"
    Bright = "\x1b[1m"
    Dim = "\x1b[2m"
    Underscore = "\x1b[4m"
    Blink = "\x1b[5m"
    Reverse = "\x1b[7m"
    Hidden = "\x1b[8m"
    FgBlack = "\x1b[30m"
    FgRed = "\x1b[31m"
    FgGreen = "\x1b[32m"
    FgYellow = "\x1b[33m"
    FgBlue = "\x1b[34m"
    FgMagenta = "\x1b[35m"
    FgCyan = "\x1b[36m"
    FgWhite = "\x1b[37m"
    BgBlack = "\x1b[40m"
    BgRed = "\x1b[41m"
    BgGreen = "\x1b[42m"
    BgYellow = "\x1b[43m"
    BgBlue = "\x1b[44m"
    BgMagenta = "\x1b[45m"
    BgCyan = "\x1b[46m"
    BgWhite = "\x1b[47m"
    console.log('\x1b[47m\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
    console.log('\x1b[33m%s\x1b[0m', "stringToMakeYellow");
*/

global.api.Log = {};

//------------------------------ Logger CONST;

global.api.Log.CONST = {};

//------------------------------ Logger Config;

global.api.Log.CONST.CONFIG = {};

var _CSJ = "Sukjune:D";
var _Someone = "_Someone_";

var _ = global.api.Log.CONST.CONFIG;
	_.__defineGetter__( "CSJLog", function(){ return _CSJ; } );
	_.__defineGetter__( "_Someone", function(){ return _Someone; } );

//------------------------------ Logger Config;

global.api.Log.pad = function( num ) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
};

/**
 * 현재시간을 반환하는 함수;
 * @return {String}
 * <code>
	23/08/2017 11:22 AM
 * </code>
 */
global.api.Log.now = function(){
	var now = new Date();
    return [
		[ global.api.Log.pad(now.getDate()), global.api.Log.pad(now.getMonth() + 1), now.getFullYear() ].join("/")
		, [ global.api.Log.pad(now.getHours()), global.api.Log.pad(now.getMinutes()), global.api.Log.pad(now.getSeconds()) ].join(":")
		, now.getHours() >= 12 ? "PM" : "AM" ].join(" ");
}


global.api.Log.regist_logger = function( d ){

	global[ d ] = {}
	global[ d ].timeStamp = function( m ){
		return console.log("[" + global.api.Log.CONST.CONFIG[ d ] + "]["+ global.api.Log.now() +"] -- " + m );
	}
	global[ d ].log = function( m ){
	return console.log( "[" + global.api.Log.CONST.CONFIG[ d ] + "]["+ global.api.Log.now() +"] -- : " + m )
	}
	global[ d ].error = function( m ){
		return console.error( "\x1b[37m\x1b[41m%s\x1b[0m","[" + global.api.Log.CONST.CONFIG[ d ] + "]["+ global.api.Log.now() +"] - error - : " + m )
	}
}

////------------------------------ Logger Regist - Logic;
//
//global.api.Log.regist_logger( "CSJLog" );
//global.api.Log.regist_logger( "_Someone" );
//
////------------------------------ Logger Test CODE;
//
//global._Someone.error("TEST Log -- 0")
//global.CSJLog.error("TEST Log -- 0")
//
////--------------------------------------------------------------------------------;