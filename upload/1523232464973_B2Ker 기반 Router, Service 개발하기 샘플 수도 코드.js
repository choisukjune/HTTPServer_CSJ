{
	//result code;
	r : ""

	//message;
	, m : ""

	//
	, data : {}|[]
}












result = { code : "", message : "", data : [] };








resultKey = [ "", "", "", "", "", "" ];

//getSearchCDList;
return db.col.find({}, { cd : 1 }).toArray();

//getSearchMasterList;
var r = {};
return db.col.find({}).forEach(function(doc){
	r[ doc.cd ] = doc;
});
return r;

//getSearchOption1List;
var r = {};
return db.col.find({}).forEach(function(doc){
	r[ doc.cd ] = doc;
});
return r;

//getSearchOption2List;
var r = {};
return db.col.find({}).forEach(function(doc){
	r[ doc.cd ] = doc;
});
return r;

//getSearchOption2List;
var r = {};
return db.col.find({}).forEach(function(doc){
	r[ doc.cd ] = doc;
});
return { r : "", m : "", type : "", data : r };





//getSeachList;
var a = getSearchCDList();
var master = getSearchMasterList();
var option1 = getSearchOption1List();
var option2 = getSearchOption2List();

var r = [];
var i=0, iLen=a.length;
for( ; i<iLen; ++i )
{
	r[ i ] = {

	};

	master[ a[ i ] ]///??
	option1[ a[ i ] ]///??
	option2[ a[ i ] ]///??
}




new Promis()
	.then( getSearchMasterList );
	.then( getSearchOption1List );
	.then( getSearchOption2List );






window.service = function( d, cbFunction ){
	getSearchCDList( d, function( result0 ){
		getSearchMasterList( d, function( result1 ){
			getSearchOption1List( d, function( result2 ){
				getSearchOption2List( d, function( result3 ){
					cbFunction({ cd : result0, master : result1, option1 : result2, option2 : result3 });
				});
			});
		});
	});
};







window.service = function( d, cbFunction ){
	var idx = 0;
	var r = {
		cd : null
		, master : null
		, option1 : null
		, option2 : null
	};

	var complete = function( result ){
		r[ result.type ] = result;
		++idx;
		if( idx == 3 ) cbFunction( r );
	};

	getSearchCDList( d, complete );
	getSearchMasterList( d, complete) ;
	getSearchOption1List( d, complete );
	getSearchOption2List( d, complete );
};



var cbFunction = function( result ){
	if( window.b2link.response.getResultStatus( result ) )
	{
		//정상 로직 추가;
	}
	else
	{
		//예외처리 추가;
		if( 1 == result.r ) console.log( "internal error" );
	}
};
window.service({}, cbFunction )