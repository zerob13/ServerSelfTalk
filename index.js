var starwars = require('starwars');
var fs = require('fs');
var talk = '\n Now is ' + (new Date()).toString() + '.\n ' + starwars() + '\n';
var path = require('path');
var myPath = path.normalize(__dirname);
var exec = require('child_process').exec;

function gitExecute(args, callback) {
  var cmd = 'git --git-dir='+path.join(myPath,'.git')+' --work-tree='+myPath+' ';

  args.forEach(function(item) {
    cmd += item + ' ';
  });
  exec(cmd, callback);
}
gitExecute(['pull', '--rebase'], function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
  fs.open(path.join(__dirname,'README.md'), 'a', 0644, function(e, fd) {
    if (e) throw e;
    console.log(talk);
    fs.write(fd, talk, function(e) {
      if (e) throw e;
      fs.closeSync(fd);
      gitExecute(['add', '-A'], function(err, stdout, stderr) {
        if (err) {
          throw err;
        }

        gitExecute(['commit', '-m', '"' + starwars() + '"'], function(err, stdout, stderr) {
          if (err) {
            throw err;
          }

        gitExecute(['push'], function(err, stdout, stderr) {
          if (err) {
            throw err;
          }

        });
        });
      });
    });
  });
});
