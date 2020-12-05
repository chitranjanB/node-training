console.log("before");

getUser(1)
  .then((user) => getRepos(user.githubUser))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("commits", commits))
  .catch((err) => console.log(err));

console.log("after");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading user from database");
      resolve({
        id,
        githubUser: "chitranjanB",
      });
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching repos for user", username);
      const repos = ["repo1", "repo2"];
      resolve(repos);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("Fetching commits for repo", repo);
      const commits = ["commit1", "commit2"];
      resolve(commits);
    }, 2000);
  });
}
