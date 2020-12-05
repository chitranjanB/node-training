console.log("before");

getUser(1, function (user) {
  getRepos(user.githubUser, function (repos) {
    getCommits(repos[0], function (commits) {});
  });
});
console.log("after");

function getUser(id, callback) {
  setTimeout(function () {
    console.log("reading user from database");
    callback({
      id,
      githubUser: "chitranjanB",
    });
  }, 2000);
}

function getRepos(username, callback) {
  setTimeout(function () {
    console.log("Fetching repos for user", username);
    const repos = ["repo1", "repo2"];
    callback(repos);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(function () {
    console.log("Fetching commits for repo", repo);
    const commits = ["commit1", "commit2"];
    callback(commits);
  }, 2000);
}
