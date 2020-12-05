const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});

promise
  .then((result) => console.log(result))
  .then(() => {
    console.log("a");
  })
  .then(() => {
    console.log("ab");
    throw new Error("err");
  })
  .then(() => {
    console.log("abc");
  })
  .catch((e) => console.log("Error1", e));
