var request = require('request');
var token = require('./secret');
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];

// STEP 1: initialization
console.log('Welcome to the GitHub Avatar Downloader!');
//THIS IS FUNCTION DECLARATION
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN,
    }
  };
  // STEP 3: calling request within function
  request(options, function (err, res, body) {
    var contributors = JSON.parse(body);
      // STEP 4: request returned from HTTP call and first callback is invoked
      cb(err, contributors);
    });
}


// STEP 2: function execution (above is only function declaration)


//THIS IS INVOKING OF THE FUNCTION / CALL THE FUNCTION
getRepoContributors(owner, repo, function (err, result) {
    // STEP 5: array of contributors get passed to final callback
  if (err) {
    console.log("Errors:", err);
  }
  
  result.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, "avatars/" + contributor.id + ".jpg");
});
});
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
  ('end', console.log('Downloading image'))                          
  console.log('Response Status Code: ', response.statusCode,
  'Response Message: ', response.statusMessage, 'Content Type: ', response.headers['content-type']);
  ('finish', console.log('Download Complete!'))
  })
  .pipe(fs.createWriteStream(filePath));
}
