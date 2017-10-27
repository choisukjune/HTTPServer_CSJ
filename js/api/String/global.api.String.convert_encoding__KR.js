/**
 * 문자열의 인코딩 방식을 변경하는 함수
 * @param  {Array} array
 * @param  {String} characterSet
 * @return {String}
 */
global.api.String.convert_encoding__KR = function( array, characterSet ){
	return global.REQUIRES.iconv.decode( Buffer.concat( array ), characterSet ).toString();
}