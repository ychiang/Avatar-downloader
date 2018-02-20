var request = require('request');
var token = require('./secret');

console.log('Welcome to the GitHub Avatar Downloader!');
//THIS IS FUNCTION DECLARATION

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'GITHUB_TOKEN'
    }
  };
  request(options, function (err, res, body) {
        cb(err, body);
    });
}


//THIS IS INVOKING OF THE FUNCTION / CALL THE FUNCTION
getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});

// getRep

// function test(value){
//     console.log("hiu ")
// }

// getRepoContributors("jQuery","jQuery",test);

// getRepoContributors("jQuery","jQuery",function(err, response){

// });


