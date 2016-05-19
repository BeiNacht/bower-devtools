var gitRepos = require('./gitRepos').repositories;
var args = process.argv.slice(2);
var Promise = require('rsvp');
var exec = Promise.denodeify(require('child_process').exec);

function cloneRepo(repo) {
    console.log("git clone: ", repo.url)
    return exec('git clone ' + repo.url + ' ' + repo.name)
        .then(() => repo);
}

function bowerLink(repo) {
    console.log("bower link:", repo.name);
    return exec('bower link', {
            cwd: process.cwd() + '/' + repo.name
        })
        .then(() => repo);
}

function checkGit() {
    return exec('git --version')
        .catch((error) => {
            console.log("Get yourself git, dude!");
            throw error;
        });
}


function setup(path) {
    console.log(process.cwd());
    if (path) {
        process.chdir(path);
    }
    console.log(process.cwd());

    var pendingTasks = gitRepos.map((repo) => {
        return cloneRepo(repo)
            .then(bowerLink)
            .then((repo) => {
                console.log("Ready: ", repo.name);
            })
            .catch(function(error) {
                console.error("Error", error);
            })
    });

    checkGit()
        .then(
            Promise.all(pendingTasks)
            .then(() => {
                console.log("Done! :-)");
            }));
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