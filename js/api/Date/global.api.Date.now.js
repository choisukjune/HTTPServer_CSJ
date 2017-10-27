
/**
 * 숫자에 자리수 추가하는 함수
 * @param  {Number} num
 * @return {String} ex)001
 */
_pad = function( num ) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
};
/**
 * 현재시간을 반환하는 함수;
 * @return {String}
 * <code>
	23/08/2017 11:22 AM
 * </code>
 */
global.api.Date.now = function(){
	var now = new Date();
    return [ [ _pad(now.getDate()), _pad(now.getMonth() + 1), now.getFullYear() ].join("/"), [ _pad(now.getHours()), _pad(now.getMinutes()), _pad(now.getSeconds()) ].join(":"), now.getHours() >= 12 ? "PM" : "AM" ].join(" ");
}
