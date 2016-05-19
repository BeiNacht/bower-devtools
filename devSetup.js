var gitRepos = require('./gitRepos').repositories;
var args = process.argv.slice(2);
var exec = require('child_process').exec;

function setup(path) {
    console.log(process.cwd());
    if (path) {
        process.chdir(path);
    }
    console.log(process.cwd());
    gitRepos.forEach(function(repo){
        var cmd = 'git clone ' + repo;
        exec(cmd, function(error, stdout, stderr) {
            var foo = stderr.split(' ')[2];
            var repoPath = foo.substring(1, foo.length - 5);
            console.log(repoPath);
            debugger;
            exec('bower link', { 
                    cwd: process.cwd() + '/' + repoPath 
                }, function(error2, stdout2, sterror2) { });
        });
    });
}

if (args[0] === 'setup') {
    setup(args[1]);
} else {
    console.log('You lost the game');
}

//var gitRepos = require('./gitRepos').repositories;
//var Git = require("nodegit");
//var args = process.argv.slice(2);
//var exec = require('child_process').exec;
//
//function setup(path) {
//    if (path) {
//        process.chdir(path);
//    }
//
//    gitRepos.forEach(function(repo){
//        var repoPaths = [];
//        Git.Clone(repo.url, repo.name)
//            .then(function(repository) {
//                console.log(repository.path());
//            })
//            .catch(function (reasonForFailure) {
//                console.log(reasonForFailure);
//
//            });
//    });
//}
//
//if (args[0] === 'setup') {
//    setup(args[1]);
//} else if (args[0] === 'pull') {
//
//} else {
//    console.log('You lost the game');
//}