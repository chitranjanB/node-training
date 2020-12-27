const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("No token provided");
    return;
  }

  try {
    const decode = jwt.verify(token, "secret");
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
