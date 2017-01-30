var fs = require('fs-extra')
var project = require('./project.config');
var path = require('path');

fs.copy(path.join(project.localPath, project.htmlFileName), path.join(project.remotePath, project.htmlFileName), function(err) {
	if (err){
		console.log(err);
	}
});
