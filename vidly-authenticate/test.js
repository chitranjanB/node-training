const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function bcryptExample() {
  const salt = await bcrypt.genSalt(10);

  console.log(salt);

  const hash = await bcrypt.hash("1234", salt);
  console.log(hash);
}

async function jwtExample() {
  const secret = "secret";
  const token = jwt.sign("O12342412341234", secret);
  console.log("token is ", token);
  console.log(jwt.verify(token, secret));

  console.log(jwt.decode(token));
}

bcryptExample();
jwtExample();
