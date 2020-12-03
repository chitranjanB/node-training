const http = require("http");

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.write(
      "<html><title>Awesome</title><body><h1>Hello World</h1></body></html>"
    );
    res.end();
  } else if (req.url === "/v1/api/courses") {
    res.write(
      JSON.stringify([
        { courseName: "Node", courseTitle: "Node for beginners" },
        { courseName: "React", courseTitle: "React design patterns" },
      ])
    );
    res.end();
  }
});

server.listen(3000);

console.log("listening on port 3000");
