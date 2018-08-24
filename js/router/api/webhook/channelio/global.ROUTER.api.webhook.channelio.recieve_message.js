global.ROUTER.api.webhook.channelio.recieve_message = function( req, res ){

	var	body = "";
	var userChatID = "";
	var message = "";

	req.on('data', function	(data) {
		body +=	data.toString();
	})

	req.on('end', function () {

		var	_q = global.REQUIRES.querystring.parse(	decodeURI( body ) );
		var ob = JSON.parse( body );

		if( ob.type == "Message" )
		{
			userChatID = ob.entity.chatId;
			message = encodeURIComponent( "Your message is " + ob.entity.message )
		}

		if( ob.type == "UserChat" )
		{
			userChatID = ob.entity.id;
			message = encodeURIComponent( "Your message is " + ob.refers.message.message )
		}

		global.CSJLog.log( "userChatID : " + ob.refers.UserChat.id )
		global.CSJLog.log( "data : " + JSON.stringify( ob ) )

		var o = {
		    host : global.ROUTER.api.webhook.channelio.CONFIG._channelio_host//o.host
		    , port : global.ROUTER.api.webhook.channelio.CONFIG._channelio_port//o.port
		    , path : "/open/user_chats/" + userChatID + "/messages?botName=" + global.ROUTER.api.webhook.channelio.CONFIG._channelio_botname//o.path
		    , headers : {
		       'Content-Type': 'application/json'
		       , 'X-Access-Key': global.ROUTER.api.webhook.channelio.CONFIG._channelio_X_Access_Key
		       , 'X-Access-Secret': global.ROUTER.api.webhook.channelio.CONFIG._channelio_X_Access_Secret
		    }
		    , data : {
		        "message" : "",
		        "botOption": {
		            "actAsManager": false,
		            "silentToManager": false,
		            "silentToGuest": false
		        }
		    }
		}

		o.data.message = message;

		global.CSJLog.log( "request data : " + JSON.stringify( o ) );

		if( ob.entity.personType != "Bot" )
		{
			global.api.Request.request__POST_https(o,"utf8",function(d){
				global.CSJLog.log( "JANDI : " + d )


				var o1 = {
					host :"wh.jandi.com"//o.host
					, port : "443"//o.port
					, path : "/connect-api/webhook/11320800/a9e7cace9fe309afe9fc5759ea212e29"//o.path
					, headers : {
						"Accept" : "application/vnd.tosslab.jandi-v2+json",
						"Content-Type" : "application/json"
					}
					, data : {
						"body" : decodeURIComponent( message, 'utf-8' ),
						"connectColor" : "#FAC11B",
						"connectInfo" : [
							{
								"title" : "UserInfo",
								"description" : decodeURIComponent( message, 'utf-8' ) + "\n" + ob.refers.user.id + "\n" + ob.refers.user.name + "\n" + ob.refers.user.country + "\n" + ob.refers.user.city
							}
							// , {
							// //"title": "Location",
							// "description": decodeURIComponent( message, 'utf-8' ),
							// "imageUrl": "http://url_to_text"
							// }
						]
					}
				}

				//o1.data.body = encodeURIComponent( "Your message is " + message )

				global.api.Request.request__POST_https(o1,"utf8",function(d){
					global.CSJLog.log( "jandi===>",d )
					global.api.Response.res_200_ok_String( req, res, "OK1");
				})

				//global.api.Response.res_200_ok_String( req, res, "OK");
			})
		}
	})
};
