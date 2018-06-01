global.ROUTER.web.Common.index = function( req,res ){
	//global.api.Mail.send_mail()



	var fs = require('fs');
	var readline = require('readline');
	var google = require('googleapis');

	// If modifying these scopes, delete credentials.json.
	var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
	var TOKEN_PATH = '/home/ubuntu/github/httpServer_csj/credentials.json';

	// Load client secrets from a local file.
	fs.readFile(TOKEN_PATH, function(err, content){
	  if (err) return console.log('Error loading client secret file:', err);
	  // Authorize a client with credentials, then call the Google Drive API.
	  console.log( content )
	  authorize(JSON.parse(content), listFiles);
	});

	/**
	 * Create an OAuth2 client with the given credentials, and then execute the
	 * given callback function.
	 * @param {Object} credentials The authorization client credentials.
	 * @param {function} callback The callback to call with the authorized client.
	 */
	function authorize(credentials, callback) {
		console.log( credentials )
	  var client_secret = credentials.web.client_secret;
	  var client_id = credentials.web.client_id;
	  var redirect_uris = credentials.web.redirect_uris;
	  var oAuth2Client = new google.oauth2_v2.Oauth2(client_id, client_secret, redirect_uris[0]);

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
