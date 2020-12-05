const p1 = Promise.resolve(1);
const p2 = Promise.reject(new Error("rejected"));

p1.then((result) => console.log(result));
p2.then((result) => console.log(result)).catch((err) => console.log(err));

const parallelResolve1 = new Promise((resolve) => setTimeout(resolve(1), 2000));
const parallelResolve2 = new Promise((resolve) => setTimeout(resolve(2), 2000));
const parallelReject1 = new Promise((resolve, reject) => {
  setTimeout(reject(new Error("Exception occurred")), 2000);
});
const parallelReject2 = new Promise((resolve, reject) => {
  setTimeout(reject(new Error("Exception occurred")), 2000);
});

Promise.all([parallelResolve1, parallelResolve2]).then((result) =>
  console.log(result)
);

Promise.all([parallelResolve1, parallelResolve2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

Promise.race([parallelResolve1, parallelResolve2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

Promise.race([parallelResolve1, parallelReject1])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

Promise.race([parallelReject1, parallelReject2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
