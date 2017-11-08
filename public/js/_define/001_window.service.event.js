//--------------------------------------------------;
// EVENT;
//--------------------------------------------------;


//-------------------------;
// PACKAGE;
//-------------------------;

window.service.EVENT = {};

//-------------------------;
// FUNCTION;
//-------------------------;

window.service.EVENT.byID = function( id, event, _cbFunc ) {
    var _el = document.getElementById( id );
    _el.addEventListener( event, function(){ _cbFunc })

};
