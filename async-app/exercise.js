async function sendEmailUser(userid) {
  const customer = await getCustomer(userid);
  if (customer.isGold) {
    const movies = await getTopMovies();
    await sendEmail(customer.email, movies);
    console.log(`movies ${movies} sent to customer ${customer.name}`);
  }
}

sendEmailUser(1);

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email",
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    });
  }, 4000);
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}
