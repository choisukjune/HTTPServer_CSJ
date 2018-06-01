global.ROUTER.web.Common.index = function( req,res ){
	//global.api.Mail.send_mail()



	var fs = require('fs');
	var readline = require('readline');
	var google = require('googleapis');

	// If modifying these scopes, delete credentials.json.
	var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

	var clidential = {
		"web":{
			"client_id":"569461541815-9pqrabnuovhsa493fhp1v11nb9q53sl9.apps.googleusercontent.com"
			,"project_id":"httpserver001-184805"
			,"auth_uri":"https://accounts.google.com/o/oauth2/auth"
			,"token_uri":"https://accounts.google.com/o/oauth2/token"
			,"auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs"
			,"client_secret":"24YPRuDtSWf2oo29PzRu7-8q"
			,"redirect_uris":[
				"http://ec2-13-125-22-207.ap-northeast-2.compute.amazonaws.com:8888/auth2callback"
			]
			,"javascript_origins":["http://ec2-13-125-22-207.ap-northeast-2.compute.amazonaws.com:8888"]
		}
	}


	authorize(JSON.parse(clidential), listFiles);

	/**
	 * Create an OAuth2 client with the given credentials, and then execute the
	 * given callback function.
	 * @param {Object} credentials The authorization client credentials.
	 * @param {function} callback The callback to call with the authorized client.
	 */
	function authorize(credentials, callback) {
	  var client_secret = credentials.installed.client_secret;
	  var client_id = credentials.installed.client_id;
	  var redirect_uris = credentials.installed.redirect_uris;
	  var oAuth2Client = new google.auth.OAuth2(
	      client_id, client_secret, redirect_uris[0]);

	  // Check if we have previously stored a token.
	  fs.readFile(TOKEN_PATH, function(err, token){
	    if (err) return getAccessToken(oAuth2Client, callback);
	    oAuth2Client.setCredentials(JSON.parse(token));
	    callback(oAuth2Client);
	  });
	}

	/**
	 * Get and store new token after prompting for user authorization, and then
	 * execute the given callback with the authorized OAuth2 client.
	 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
	 * @param {getEventsCallback} callback The callback for the authorized client.
	 */
	function getAccessToken(oAuth2Client, callback) {
	  const authUrl = oAuth2Client.generateAuthUrl({
	    access_type: 'offline',
	    scope: SCOPES,
	  });
	  console.log('Authorize this app by visiting this url:', authUrl);
	  var rl = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout,
	  });
	  rl.question('Enter the code from that page here: ', function(code){
	    rl.close();
	    oAuth2Client.getToken(code, function(err, token){
	      if (err) return callback(err);
	      oAuth2Client.setCredentials(token);
	      // Store the token to disk for later program executions
	      fs.writeFile(TOKEN_PATH, JSON.stringify(token), function(err){
	        if (err) console.error(err);
	        console.log('Token stored to', TOKEN_PATH);
	      });
	      callback(oAuth2Client);
	    });
	  });
	}

	/**
	 * Lists the names and IDs of up to 10 files.
	 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
	 */
	function listFiles(auth) {
	  const drive = google.drive({version: 'v3', auth});
	  drive.files.list({
	    pageSize: 10,
	    fields: 'nextPageToken, files(id, name)',
	}, function(err, data){
	    if (err) return console.log('The API returned an error: ' + err);
	    var files = data.files;
	    if (files.length) {
	      console.log('Files:');
	      files.map(function(file){
	        console.log(`${file.name} (${file.id})`);
	      });
	    } else {
	      console.log('No files found.');
	    }
	  });
	}

	global.api.HTML.render_html( req, res );

};
