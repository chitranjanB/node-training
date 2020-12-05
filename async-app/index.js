console.log("before");

getUser(1, function (user) {
  console.log(user);
  getRepos(user.githubUser, function (repos) {
    console.log(repos);
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
