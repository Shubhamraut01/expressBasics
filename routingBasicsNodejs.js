const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("hello world");
    res.end();
  }
  if (url === "/users") {
    res.write("here is a user list");
    res.end();
  }
  res.write("page not found");
  res.end();
});

server.listen(3000);
