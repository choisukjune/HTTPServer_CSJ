/**
 * 숫자에 자리수 추가하는 함수
 * @param  {Number} num
 * @return {String} ex)001
 */
global.api.String.pad = function( num ) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
};