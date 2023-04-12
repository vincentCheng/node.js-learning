var http = require("http");
var app = (exports = module.exports = {});

app.listen = function listen() {
  var server = http.createServer(this);

  // apply 这样设置，那么server.listen的上下文就是server
  // 而不是app
  return server.listen.apply(server, arguments);
};
