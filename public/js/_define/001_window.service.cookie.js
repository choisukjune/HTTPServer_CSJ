//--------------------------------------------------;
// UTIL;
//--------------------------------------------------;

//-------------------------;
// PACKAGE;
//-------------------------;


window.service.cookie = {};

//-------------------------;
// FUNCTION;
//-------------------------;

window.service.cookie.setCookie = function( cookie_name, cookie_value, expire_time )
{
    var d = new Date();
    d.setTime( d.getTime() + expire_time );
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
}

window.service.cookie.getCookie = function( cookie_name )
{
    var name = cookie_name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

window.service.cookie.getCookie_all_to_JSON = function()
{
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var r = {};
    var _tmep;
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        _temp = c.split("=");
        r[ _temp[ 0 ] ] = _temp[ 1 ];
    }
    return r;
}
