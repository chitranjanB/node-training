const http = require("http");

const server = http.createServer();

//socket based handling
server.on("connection", function (socket) {
  console.log("new connection");
});

server.listen(3000);

console.log("listening on port 3000");
