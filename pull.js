var exec = require('child_process').exec
var path = require('path')

module.exports = function(target, done) {
    var cmd = 'git pull origin master'
    var opts = {
        cwd: path.dirname(target)
    }
    exec(cmd, opts, function(err, stdout, stderr) {
        console.log(stdout)
        console.log(stderr)
        done(err || null);
    })
};