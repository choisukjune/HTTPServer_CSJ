global.ROUTER.api.webhook.channelio.recieve_message = function( req, res ){

	var	body = '';
	req.on('data', function	(data) {
		body +=	data.toString();
	   // global.CSJLog.timeStamp("Partial body: " + body);
	})

	req.on('end', function () {

		var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );
		var ob = JSON.parse( body );

		var o = global.ROUTER.api.webhook.channelio.CONFIG._options

		o.path = o.path.replace("{{chatId}}",ob.entity.chatId)
				.replace("{{botname}}",global.ROUTER.api.webhook.channelio.CONFIG._botname);

		o.message = encodeURIComponent( "Your message is " + ob.entity.message )

		if( ob.entity.personType != "Bot" )
		{
			global.api.Request.request__POST_https(o,"utf8",function(d){
				console.log( "=======================>",d )
				global.api.Response.res_200_ok_String( req, res, "OK");
			})
		}
	})
};
