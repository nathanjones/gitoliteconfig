var exec = require("child_process").exec;
var fs = require( "fs" );

//TODO: make sure "import *.conf" is included in the {repository}.conf file for each repository
//TODO: add sample config file and add better documentation.

var add_user_permissions = function(config){
 
  var input_data = '';
	fs.readFile(config, 'utf-8', function (err, data) {
	  if (err) throw err;
	  console.log(data);
	  input_data = data;
	  
		var data = JSON.parse(input_data);
		
		// get list of users in config file
		for (var user in data) {
			
			//make sure that inherited items are not included
			if ( ! data.hasOwnProperty( user ) ) continue;
			console.log(user);
				
			// get list of repositories for current user
			for ( var repository in data[ user ] ) {
				console.log(repository);
				
				var thisUser = data[ user ];
				var permission = thisUser[ repository ];
				
				console.log(permission);
				
				// initialize the command to create the user permission file 
				// echo "repo {repository}" && echo "{permission} = {user}" >> {repository}.{user}.conf 
				var conf = 'echo "' + 'repo ' + repository + '" >> ' + repository + '.' + user + '.conf' + 
						'&& echo "' + permission + '  =  ' + user + '" >> ' + repository + '.' + user + '.conf';
				
				exec(conf);
				
			};		
		};
	});
	
	
};

exports.version = "0.0.1";
exports.add_user_permissions = add_user_permissions;
