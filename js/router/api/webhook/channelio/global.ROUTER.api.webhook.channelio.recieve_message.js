global.ROUTER.api.webhook.channelio.recieve_message = function( req, res ){

	var	body = '';
	req.on('data', function	(data) {
		body +=	data.toString();
	   // global.CSJLog.timeStamp("Partial body: " + body);
	})

	req.on('end', function () {

		//var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );
		var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );

		//console.log( global.REQUIRES.querystring.escape( decodeURI( body ) ))
		//global.CSJLog.timeStamp( JSON.stringify( _q ) )
		console.log( body )
		//console.log( _q )
		//https://api.channel.io/open/user_chats/{userChatId}/messages
		var X_Access_Key = "5af3fe773fcc2fa8";
		var X_Access_Secret = "fbf0ce1cf97738667abbfbabc0ec0b36"

		var ob = JSON.parse( body );
		console.log( ob )
		var o = {
			host: "api.channel.io"//o.host
			, port: "443"//o.port
			, path: "/open/user_chats/" + ob.entity.chatId + "/messages"//o.path
			, headers : {
			   'Content-Type': 'application/json'
			   , 'Content-Length': -1
			   , 'X-Access-Key': X_Access_Key
			   , 'X-Access-Secret': X_Access_Secret
			}
			, data : {
			    "message": "Your message",
			    "botOption": {
			        "actAsManager": false,
			        "silentToManager": false,
			        "silentToGuest": false
			    }
			}
			,botname : "Choisukjune__AAA"
		}
		console.log( o )
		/*
		var options = {
			hostname: o.host
			, port: o.port
			, path: o.path
			, method: "POST"
			//, headers: {
			//   'Content-Type': 'application/x-www-form-urlencoded',
			//   //'Content-Length': Buffer.byteLength(postData)
			// }
			// , data : {
			//   a : "a",
			//   b : "b"
			// }
		};*/
		// console.log( typeof( body ))
		// console.log( body.entity.personType )
		if( ob.entity.personType != "Bot" )
		{
			global.api.Request.request__POST_https(o,"utf8",function(d){
				console.log( "=======================>",d )
				global.api.Response.res_200_ok_String( req, res, "OK");
			})
		}
	})
};
